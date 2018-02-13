import React from 'react';
import { connect } from 'react-redux';
import { Font } from 'expo';
import { View, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { signOut } from '../../actions/auth';
import styles from '../../utils/styles';

const mapDispatchToProps = dispatch => ({
  SignOut: user => dispatch(signOut(user))
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

  render() { //need to remove current user keys from AsyncStorage
    return this.state.fontLoaded ? <View style={styles.flexRow}>
      <TouchableOpacity onPress={this.props.SignOut}>
        <FontAwesome>{Icons.signOut}</FontAwesome>
      </TouchableOpacity>
    </View> : null;
  }
}

export default connect(null, mapDispatchToProps)(Nav);
