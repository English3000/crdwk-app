import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const styles = StyleSheet.create({
  textInput: { paddingLeft: 10, paddingBottom: 6, paddingTop: 4, backgroundColor: 'white' },
});

export const Screen = props => <View {...props}>{ props.children}</View>;

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
