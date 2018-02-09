import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AuthForm from './home/AuthForm';

const styles = StyleSheet.create({
  centered: {justifyContent: 'center', alignItems: 'center'},
  home: {flex: 1},
});

export default () => [
  <AuthForm key='AuthForm'/>,
  <View key='Home' style={styles.home}>
    <Text>Page</Text>
  </View> //placeholder
];
