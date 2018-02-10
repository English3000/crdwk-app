import React from 'react';
import { StyleSheet, Platform, View, Text } from 'react-native';
import { Padding, ErrorBoundary } from '../utils/elements';
import AuthForm from './home/AuthForm';

const styles = StyleSheet.create({
  home: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default () => [
  <Padding key='Padding'/>,

  <ErrorBoundary>
    <AuthForm key='AuthForm'/>
  </ErrorBoundary>,
  // PLACEHOLDER
  <View key='Home' style={styles.home}>
    <Text>Page</Text>
  </View>
];
