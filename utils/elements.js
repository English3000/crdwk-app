import React from 'react';
import { Dimensions, StyleSheet, Platform, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  padding: {paddingTop: height * 0.05},
});

export const Padding = () => Platform.OS === 'android' ?
                               <View style={styles.padding}></View> : null;
