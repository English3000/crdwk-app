import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, TouchableOpacity, TextInput, AsyncStorage, Text, Alert } from 'react-native';
import { signUp, signIn } from '../../actions/auth';
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
  textInput: { width: width * 0.5, paddingLeft: 7.5, paddingBottom: 4.5, paddingTop: 3,
               borderStyle: 'solid', borderColor: 'lightgray', borderWidth: 1 },

  topRounded: {borderTopLeftRadius: 7.5, borderTopRightRadius: 7.5},
  bottomRounded: {borderBottomLeftRadius: 7.5, borderBottomRightRadius: 7.5},

  button: { width: 0, height: 0, borderStyle: 'solid', padding: 0, margin: 0,
            borderRadius: 0, backgroundColor: 'transparent' },
  signUp: { borderTopWidth: 0, borderRightWidth: 36, borderBottomWidth: 55, borderLeftWidth: 36,
            borderColor: 'transparent', borderBottomColor: 'lightgray' },
  signIn: { borderTopWidth: 32, borderRightWidth: 0, borderBottomWidth: 32, borderLeftWidth: 55,
            borderTopColor: 'transparent', borderRightColor: 'transparent',
            borderBottomColor: 'transparent', borderLeftColor: 'lightgray' },
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
      response => this.handleAuthResponse(response) );
  }

  triangleSignIn(email, password) {
    this.props.SignIn({email, password}).then(
      response => this.handleAuthResponse(response) );
  }

  handleAuthResponse(response) {
    if (response instanceof Array) {
      Alert.alert('', `${response.join('.\n\n')}.`);
    } else {
      AsyncStorage.setItem(CURRENT_USER_TOKEN, response.session_token);
      AsyncStorage.setItem(CURRENT_USER_ID, response.id); //may need to convert id to String
    }
  }

  render() {
    const {email, password} = this.state;
    const {errors} = this.props;
    //make Text onPress trigger TouchableOpacity https://facebook.github.io/react-native/docs/direct-manipulation.html
    return <View style={custom.authForm}>
      <View>
        <TouchableOpacity onPress={() => this.triangleSignUp(email, password)}
                          style={[custom.button, custom.signUp]}></TouchableOpacity>
        <Text onPress={() => this.triangleSignUp(email, password)}
              style={custom.signUpText}>{`Sign\nUp`}</Text>
      </View>

      <View>
        <TextInput placeholder='Email' defaultValue={email} autoFocus
                   onChange={event => this.setState({email: event.target.value})}
                   underlineColorAndroid='transparent' style={[custom.textInput, custom.topRounded]}/>
        <TextInput placeholder='Password' defaultValue={password} secureTextEntry={true}
                   onChange={event => this.setState({password: event.target.value})}
                   underlineColorAndroid='transparent' style={[custom.textInput, custom.bottomRounded]}/>
      </View>

      <View>
        <TouchableOpacity onPress={() => this.triangleSignIn(email, password)}
                          style={[custom.button, custom.signIn]}></TouchableOpacity>
        <Text onPress={() => this.triangleSignIn(email, password)}
              style={custom.signInText}>Sign In</Text>
      </View>
    </View>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
