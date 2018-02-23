import { RECEIVE_CURRENT_USER } from '../actions/auth';
import { RECEIVE_USER, RECEIVE_USERS } from '../actions/visit';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  Object.freeze(state);
  let newState = merge({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
    case RECEIVE_USER:
      if (action.user) newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_USERS:
      return merge({}, newState, action.users);
    default:
      return state;
  }
};
