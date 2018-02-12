import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Padding, ErrorBoundary } from '../utils/elements';
import Nav from './Nav';
import AuthForm from './AuthForm';
import styles from '../utils/styles';

const mapStateToProps = ({ session }) => ({ currentUser: session.currentUser });

const Header = ({ currentUser }) => [
  <Padding key='padding'/>,
  currentUser ? <Nav/> :
  <View style={styles.header}>
    <Text>Make it happen</Text>
    <View style={{display: 'block'}}>
      <ErrorBoundary> <AuthForm /> </ErrorBoundary>
    </View>
    <Text>crdwk</Text>
  </View>,
  <View key='placeholder' style={styles.placeholder}></View>,
];

export default connect(mapStateToProps, null)(Header);
