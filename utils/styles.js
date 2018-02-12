import React from 'react';
import { StyleSheet } from 'react-native';
import { height } from '../screens/Home';

export default StyleSheet.create({
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  header: { position: 'fixed', margin: '0 auto', padding: '15px 0',
            width: '100%', boxSizing: 'border-box', backgroundColor: 'white' },
  placeholder: {height: height * 0.1},
  flexRow: {flexDirection: 'row'}
});
