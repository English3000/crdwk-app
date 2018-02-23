import { combineReducers } from 'redux';
import session from './session';
import errors from './errors';
import users from './users';
import searches from './searches';

export default combineReducers({session, errors, users, searches});
