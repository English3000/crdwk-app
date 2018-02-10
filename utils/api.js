import axios from 'axios';

const HOST = '172.20.12.9:3000'; //problem w/ IP address--guess I'll need to try at a/A

// export const signUp = user => fetch(`http://${HOST}/api/users`, {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({user})
// });

export const signUp = user => axios.post(`http://${HOST}/api/users`, {user}).catch(err => handleError(err));
export const signIn = user => axios.post(`http://${HOST}/api/session`, {user}).catch(err => handleError(err));
export const signOut = () => axios.delete(`http://${HOST}/api/session`);

function handleError(error) {
  if (error.response) {
    console.log('Response');
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log('Request');
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    console.log('Failed request');
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log('Config');
  console.log(error.config);
}
