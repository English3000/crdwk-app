import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, TouchableOpacity, TextInput, Text, Alert } from 'react-native';
import { styles } from '../../utils/elements';
import { SecureStore } from 'expo';
import { signUp, signIn, RECEIVE_ERRORS } from '../../actions/auth';
import { CURRENT_USER_TOKEN, CURRENT_USER_ID } from '../../App';

const mapStateToProps = ({ errors }) => ({ errors });

const mapDispatchToProps = dispatch => ({
  SignUp: user => dispatch(signUp(user)),
  SignIn: user => dispatch(signIn(user))
});

const { width } = Dimensions.get('window');

const custom = StyleSheet.create({
  authForm: { width: width * 0.925, flexDirection: 'row', marginVertical: 6.25,
              alignItems: 'center', justifyContent: 'space-between' },

  topRounded: { borderTopLeftRadius: 7.5, borderTopRightRadius: 7.5,
                borderWidth: 1, borderBottomWidth: 0.5, borderColor: '#ffd24d',
                height: 32.5, width: width * 0.5 },
  bottomRounded: { borderBottomLeftRadius: 7.5, borderBottomRightRadius: 7.5,
                   borderWidth: 1, borderTopWidth: 0.5, borderColor: '#ffd24d', 
                   height: 32.5, width: width * 0.5 },

  button: { width: 0, height: 0, borderStyle: 'solid', padding: 0, margin: 0,
            borderRadius: 0, backgroundColor: 'transparent' },
  signUp: { borderTopWidth: 0, borderRightWidth: 36, borderBottomWidth: 55, borderLeftWidth: 36,
            borderColor: 'transparent', borderBottomColor: '#ffd24d' },
  signIn: { borderTopWidth: 32, borderRightWidth: 0, borderBottomWidth: 32, borderLeftWidth: 55,
            borderTopColor: 'transparent', borderRightColor: 'transparent',
            borderBottomColor: 'transparent', borderLeftColor: '#ffd24d' },
  signUpText: {position: 'absolute', marginTop: 17.5, marginLeft: 22.5, textAlign: 'center'},
  signInText: {position: 'absolute', marginTop: 21.25, marginLeft: 2},

  errors: {marginVertical: 12.5},
  err: {textAlign: 'center', width: width * 0.925},
});

class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = {email: '', password: ''};
    this.handleAuthResponse.bind(this);
  }

  triangleSignUp(email, password) {
    this.props.SignUp({email, password}).then(
      action => this.handleAuthResponse(action) );
  }

  triangleSignIn(email, password) {
    this.props.SignIn({email, password}).then(
      action => this.handleAuthResponse(action) );
  }

  handleAuthResponse(action) {
    const {errors} = this.props;

    if (action.type === RECEIVE_ERRORS) {
      Alert.alert('', `${errors.join('.\n\n')}.`);
    } else { //no error message: assume persistence...
      SecureStore.setItemAsync(CURRENT_USER_TOKEN, action.user.session_token);
      SecureStore.setItemAsync(CURRENT_USER_ID, `${action.user.id}`);
    }
  }

  render() {
    const {email, password} = this.state;
    const {errors} = this.props;

    return <View style={custom.authForm}>
      <TouchableOpacity onPress={() => this.triangleSignUp(email, password)}>
        <TouchableOpacity style={[custom.button, custom.signUp]}></TouchableOpacity>
        <Text style={custom.signUpText}>{`Sign\nUp`}</Text>
      </TouchableOpacity>

      <View>
        <TextInput placeholder='Email' defaultValue={email} autoFocus
                   onChangeText={input => this.setState({email: input})}
                   underlineColorAndroid='transparent' style={[styles.textInput, custom.topRounded]}/>
        <TextInput placeholder='Password' defaultValue={password} secureTextEntry={true}
                   onChangeText={input => this.setState({password: input})}
                   underlineColorAndroid='transparent' style={[styles.textInput, custom.bottomRounded]}/>
      </View>

      <TouchableOpacity onPress={() => this.triangleSignIn(email, password)}>
        <TouchableOpacity style={[custom.button, custom.signIn]}></TouchableOpacity>
        <Text style={custom.signInText}>Sign In</Text>
      </TouchableOpacity>
    </View>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
