import axios from 'axios';

const PORT = ':3000';
//Expo has problem w/ apt wifi
const HOST = `10.3.212.20`;//`172.31.114.101`;//`192.168.3.166`;

export const signUp = user => axios.post(`http://${HOST}${PORT}/api/users`, {user});
export const updateUser = user => axios.patch(`http://${HOST}${PORT}/api/users/${user.id}`, {user});
export const signIn = user => axios.post(`http://${HOST}${PORT}/api/session`, {user});
export const signOut = () => axios.delete(`http://${HOST}${PORT}/api/session`);

export const visitProfile = id => axios.get(`http://${HOST}${PORT}/users/${id}`);
export const findUsers = query => axios.get( `http://${HOST}${PORT}/api/users`, {params: {query}} );
