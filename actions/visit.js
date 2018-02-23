import * as Api from '../utils/api';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const receiveUser = user => ({type: RECEIVE_USER, user});
export const receiveUsers = users => ({type: RECEIVE_USERS, users});

export const LOADING = 'LOADING';
export const loading = () => ({type: LOADING});

export const RECEIVE_QUERY = 'RECEIVE_QUERY';
export const recordSearch = query => ({type: RECEIVE_QUERY, query});

// Actions
export const visitProfile = id => dispatch => Api.visitProfile(id).then(
  user => { if (user.id) dispatch(receiveUser(user.data)); }
);

export const findUsers = query => dispatch => {
  dispatch(loading());
  dispatch(recordSearch(query));
  Api.findUsers(query).then( users => dispatch(receiveUsers(users.data)) );
};
