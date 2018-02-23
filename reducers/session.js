import { RECEIVE_CURRENT_USER } from '../actions/auth';
import { LOADING, RECEIVE_USERS } from '../actions/visit';
import merge from 'lodash';

const _nullSession = {currentUser: null, loading: false};

export default (state = _nullSession, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {currentUser: action.user, loading: false};
    case LOADING:
      return {currentUser: state.currentUser, loading: true};
    case RECEIVE_USERS:
      return {currentUser: state.currentUser, loading: false};
    default:
      return state;
  }
};
