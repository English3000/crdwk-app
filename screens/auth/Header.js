import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { ErrorBoundary } from '../../utils/elements';
import Nav from './Nav';
import AuthForm from './AuthForm';

const mapStateToProps = ({ session }) => ({ currentUser: session.currentUser });

const { height } = Dimensions.get('window');

const custom = StyleSheet.create({
  center: {alignItems: 'center'},
  paddingTop: {paddingTop: height * 0.05},
});

const Header = ({ currentUser }) => [
  <View key='Padding' style={custom.paddingTop}></View>,
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
