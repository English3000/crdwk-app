import React from 'react';
import { Text } from 'react-native';

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
