import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';
import { Padding, ErrorBoundary } from '../../utils/elements';
import Nav from './Nav';
import AuthForm from './AuthForm';

const mapStateToProps = ({ session }) => ({ currentUser: session.currentUser });

const custom = StyleSheet.create({
  center: {alignItems: 'center'}
});

const Header = ({ currentUser }) => [
  <Padding key='padding'/>,
  currentUser ? <Nav /> :
  <View key='Auth' style={custom.center}>
    <Text>Make it happen</Text>
    <ErrorBoundary>
      <AuthForm />
    </ErrorBoundary>
    <Text>crdwk</Text>
  </View>,
];

export default connect(mapStateToProps, null)(Header);
