import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Font, SecureStore } from 'expo';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { signOut } from '../../actions/auth';
import { CURRENT_USER_TOKEN, CURRENT_USER_ID } from '../../App';

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  SignOut: () => dispatch(signOut())
});

const custom = StyleSheet.create({
  navStyle: {flexDirection: 'row', justifyContent: 'flex-end', borderBottom: '1px solid black'}
});

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {fontLoaded: false};
  }

  async componentDidMount() {
    await Font.loadAsync({
      'FontAwesome': require('../../assets/fonts/FontAwesome.otf'),
    });

    this.setState({ fontLoaded: true });
  }

  handleSignOut(SignOut) {
    SignOut();
    SecureStore.deleteItemAsync(CURRENT_USER_TOKEN).catch(err => { console.log(err); });
    SecureStore.deleteItemAsync(CURRENT_USER_ID).catch(err => { console.log(err); });
  }

  render() {
    return this.state.fontLoaded ?
      <View style={custom.navStyle}>
        <TouchableOpacity onPress={() => this.handleSignOut(this.props.SignOut)}>
          <FontAwesome style={{fontSize: 25}}>{Icons.signOut}</FontAwesome>
        </TouchableOpacity>
      </View> : null;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
