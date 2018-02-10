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
    AsyncStorage.getItem(CURRENT_USER).then(
      currentUser => { if (currentUser) this.state.session = {currentUser}; },
      err => { console.log(err); }
    );
  }

  render() {
    return <Provider store={createStore(this.state)}>
      <NativeRouter>
        <Screens />
      </NativeRouter>
    </Provider>;
  }
}
