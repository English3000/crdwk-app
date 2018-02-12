import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import createStore from './store';
import Screens from './Screens';

export const CURRENT_USER = 'CURRENT_USER';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentWillMount() {
    await AsyncStorage.getItem(CURRENT_USER).then(session_token => {
      if (session_token) {
        this.state.session = {currentUser: {session_token}};
      }
    }); //will need to get currentUser by session_token
  }

  render() {
    return <Provider store={createStore(this.state)}>
      <NativeRouter>
        <Screens />
      </NativeRouter>
    </Provider>;
  }
}
