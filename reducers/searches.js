import { RECEIVE_QUERY } from '../actions/visit';

export default (state = [], action) => {
  let newState = [].concat(state);

  switch (action.type) {
    case RECEIVE_QUERY:
      newState.unshift(action.query.toLowerCase());
      return newState;
    default:
      return state;
  }
};
