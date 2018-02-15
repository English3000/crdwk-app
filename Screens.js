import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Switch, Route } from 'react-router-native';
import { AuthRoute } from './utils/routing';
import { ErrorBoundary, Page } from './utils/elements';
import Header from './screens/headers/Header';
import Nav from './screens/headers/Nav';
import Home from './screens/Home';
import Profile from './screens/Profile';

const { height } = Dimensions.get('window');

const mapStateToProps = ({ session }) => ({ currentUser: session.currentUser });

const custom = StyleSheet.create({
  pageStyle: { backgroundColor: 'whitesmoke', height, flexDirection: 'column',
               justifyContent: 'center', alignItems: 'center' },
  paddingTop: {paddingTop: height * 0.05},
});

const Screens = ({ currentUser }) => [
  <View key='Padding' style={custom.paddingTop}></View>,

  currentUser ? null :
  <ErrorBoundary key='Header'>
    <Switch>
      <Route path='/users' component={Header}/>
      <AuthRoute exact path='/' component={Header}/>
    </Switch>
  </ErrorBoundary>,

  <ErrorBoundary key='Nav'>
    <Nav currentUser={currentUser}/>
  </ErrorBoundary>,

  <ErrorBoundary key='Page'>
    <Page style={custom.pageStyle}>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/users/:id' component={Profile}/>
      </Switch>
    </Page>
  </ErrorBoundary>
];

export default connect(mapStateToProps)(Screens);
