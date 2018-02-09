import axios from 'axios';

export const HOST = '172.20.12.9:3000'; //where do I send my API call to?

export const signUp = user => axios.post(`http://${HOST}/api/users`, {user});
export const signIn = user => axios.post(`http://${HOST}/api/session`, {user});
export const signOut = () => axios.delete(`http://${HOST}/api/session`);
