import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Provider } from 'react-redux';
import { NativeRouter } from 'react-router-native';
import createStore from './store';
import Screens from './Screens';

export default class App extends React.Component {
  render() {
    return <Provider store={createStore()}>
      <NativeRouter>
        <Screens />
      </NativeRouter>
    </Provider>;
  }
}
