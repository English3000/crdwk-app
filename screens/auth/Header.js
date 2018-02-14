import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { ErrorBoundary } from '../../utils/elements';
import Nav from './Nav';
import AuthForm from './AuthForm';

const mapStateToProps = ({ session }) => ({ currentUser: session.currentUser });

const { height } = Dimensions.get('window');

const custom = StyleSheet.create({
  authStyle: {alignItems: 'center', borderBottom: '1px solid black'},
  paddingTop: {paddingTop: height * 0.05},
});

const Header = ({ currentUser }) => [
  <View key='Padding' style={custom.paddingTop}></View>,

  currentUser ? <Nav key='Nav'/> :
  <View key='Auth' style={custom.authStyle}>
    <Text>Make it happen.</Text>
    <ErrorBoundary>
      <AuthForm />
    </ErrorBoundary>
    <Text>crdwk</Text>
  </View>,
  //Mobile-first feature!

  //when signed out, do AuthForm + Nav:
  // AuthForm disappears when signed in,
  // no SignOut icon in Nav when signed out,
  // no Home icon on Home page.
];

export default connect(mapStateToProps, null)(Header);
