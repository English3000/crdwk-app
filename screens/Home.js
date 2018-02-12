import React from 'react';
import { View, Text } from 'react-native';
import Header from './auth/Header';
import styles from '../utils/styles';

export default () => [
  <Header key='Header'/>,
  <View key='Home' style={styles.centered}>
    <Text>Home Page</Text>
  </View>
];
