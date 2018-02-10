import React from 'react';
import { Dimensions, StyleSheet, Platform, View, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  padding: {paddingTop: height * 0.05},
});

export const Padding = () => Platform.OS === 'android' ?
                               <View style={styles.padding}></View> : null;

export class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {error: null};
  }

  componentDidCatch(error) { this.setState({error}); }

  render() {
    return this.state.error ?
      <Text>{this.state.error.toString()}</Text> : this.props.children;
  }
}
