import React from 'react';
import { StyleSheet, Platform, View, Text } from 'react-native';
import { Padding } from '../utils/elements';
import AuthForm from './home/AuthForm';

const styles = StyleSheet.create({
  home: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default () => [
  <Padding />,
  <AuthForm key='AuthForm'/>,
  <View key='Home' style={styles.home}>
    <Text>Page</Text>
  </View> //placeholder
];
