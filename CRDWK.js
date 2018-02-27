import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text, TextInput } from 'react-native';
import { Font, SecureStore } from 'expo';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { withRouter, Switch, Route, Link } from 'react-router-native';
import { AuthRoute } from './utils/routing';
import { ErrorBoundary, Screen, styles } from './utils/elements';
import { signOut } from './actions/auth';
import { findUsers } from './actions/visit';
import AuthHeader from './screens/headers/AuthHeader';
import NewUserForm from './screens/headers/NewUserForm';
import Home from './screens/Home';
import Profile from './screens/Profile';
import { CURRENT_USER_TOKEN, CURRENT_USER_ID } from './App';

const { height, width } = Dimensions.get('window');

const mapStateToProps = ({ users, session, searches }) => ({
  users, session, searches
});

const mapDispatchToProps = dispatch => ({
  FindUsers: query => dispatch(findUsers(query)),
  SignOut: () => dispatch(signOut())
});

const custom = StyleSheet.create({
  navStyle: { justifyContent: 'space-between', alignItems: 'center',
              position: 'absolute', bottom: height * 0.015, width: '90%',
              marginHorizontal: '5%', flexDirection: 'row' },
  textInputStyle: { paddingRight: 6, paddingLeft: 15, paddingBottom: 9, paddingTop: 6,
                    borderRadius: 2.5, width: width * 0.885 },
  connectSym: {fontSize: 32, height: '100%', fontWeight: '600', position: 'relative', top: -2.5}
});

class CRDWK extends React.Component {
  constructor() {
    super();
    this.state = {query: '', fontLoaded: false};
  }

  async componentDidMount() {
    await Font.loadAsync({
      'FontAwesome': require('./assets/fonts/FontAwesome.otf'),
    });

    this.setState({ fontLoaded: true });
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.session.currentUser && newProps.session.currentUser) this.setState({query: ''});
  }

  render() {
    const {users, SignOut, location} = this.props;
    const {currentUser, loading} = this.props.session;
    const {query, fontLoaded} = this.state;

    const searchResults = Object.values(users).filter(user => user.name && query ?
      user.name.toLowerCase().includes(query.toLowerCase()) : false);

    const homePath = currentUser ? `/users/${currentUser.id}` : '/';

    return [
      <View key='Padding' style={{paddingTop: height * 0.05, backgroundColor: '#ffff99'}}></View>,

      <ErrorBoundary key='Header'>
        {currentUser ? currentUser.name ?
          null : <NewUserForm currentUser={currentUser}/> : <AuthHeader />}

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput placeholder='Search for users...'
                     style={[styles.textInput, custom.textInputStyle]}
                     onChangeText={search => this.handleSearch(search)}
                     onFocus={event => this.setState({query: event.nativeEvent.text})}/>
          {fontLoaded ? location.pathname === homePath ? null :
          <TouchableOpacity>
            <Link to={homePath} onPress={() => this.setState({query: ''})}>
              <FontAwesome style={{color: 'black', fontSize: 25}}>{Icons.home}</FontAwesome>
            </Link>
          </TouchableOpacity> : null}
        </View>
      </ErrorBoundary>,
      // v- add styling -v
      <ErrorBoundary key='Screen'>
        <Screen style={{height, backgroundColor: '#fff2e6'}}>
          {query === '' || !query || loading && query.length - 1 === 0 ?
          <Switch>
            <AuthRoute exact path='/' component={Home}/>
            <Route exact path='/users/:id' component={Profile}/>
          </Switch> :
          //add TouchableOpacity affordance? (w/ proper width & backgroundColor)
          searchResults.length > 0 ? searchResults.map(user => (
            <Link key={user.id} to={`/users/${user.id}`}
                  onPress={() => this.setState({query: ''})}>
              <Text>{user.name}</Text>
            </Link>
          )) : <Text>No results found.</Text>}
        </Screen>
      </ErrorBoundary>,

      fontLoaded ? <ErrorBoundary key='Nav'>
        <View style={custom.navStyle}>
          <View style={{width: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          {currentUser && location.pathname[location.pathname.length - 1] !== `${currentUser.id}` ? [
            <Text key='Connect' style={custom.connectSym}>&infin;</Text>,
            <FontAwesome key='Chat' style={{fontSize: 25}}>{Icons.comments}</FontAwesome>,
            <Text key='placeholder' style={{width: 22}}></Text> ] : null}
          </View>

          <View style={{width: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>{currentUser ? [
            <FontAwesome key='MyOrgs' style={{fontSize: 25}}>{Icons.briefcase}</FontAwesome>,
            <FontAwesome key='NewOrg' style={{fontSize: 25}}>{Icons.sitemap}</FontAwesome>,
            <TouchableOpacity key='SignOut' onPress={() => this.handleSignOut(SignOut)}>
              <FontAwesome style={{fontSize: 25}}>{Icons.signOut}</FontAwesome>
            </TouchableOpacity> ] : null}
          </View>
        </View>
      </ErrorBoundary> : null
    ];
  }

  handleSearch(query) {
    const {searches, FindUsers} = this.props;

    if (!searches.includes(query.toLowerCase()) && query.length > 0) FindUsers(query); //can't chain .then
    this.setState({query});
  }

  handleSignOut(SignOut) {
    this.setState({query: ''}); //make sure this works
    SignOut();
    SecureStore.deleteItemAsync(CURRENT_USER_TOKEN).catch(err => { console.log(err); });
    SecureStore.deleteItemAsync(CURRENT_USER_ID).catch(err => { console.log(err); });
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CRDWK));
