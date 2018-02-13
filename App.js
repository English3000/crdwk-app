import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import createStore from './store';
import Screens from './Screens';
import { visitProfile } from './actions/visit';

export const CURRENT_USER_TOKEN = 'CURRENT_USER_TOKEN';
export const CURRENT_USER_ID = 'CURRENT_USER_ID';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentWillMount() {
    //first check for session_token b/c it's secure
    await AsyncStorage.getItem(CURRENT_USER_TOKEN).then(session_token => {
      if (session_token) AsyncStorage.getItem(CURRENT_USER_ID).then(id => {
        this.state = {currentUser: {id, session_token}};
      });
    });
  }

  render() {
    return <Provider store={createStore(this.state)}>
      <NativeRouter>
        <Screens />
      </NativeRouter>
    </Provider>;
  }
}
