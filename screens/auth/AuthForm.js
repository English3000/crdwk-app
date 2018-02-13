import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, TouchableOpacity, TextInput, AsyncStorage, Text } from 'react-native';
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

//will need to make custom TriangleButton components
class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = {email: '', password: ''};
    this.setCurrentUser.bind(this);
  }

  setCurrentUser(session_token, id) {
    AsyncStorage.setItem(CURRENT_USER_TOKEN, session_token);
    AsyncStorage.setItem(CURRENT_USER_ID, id); //may need to convert id to String
  }

  triangleSignUp(email, password) {
    this.props.SignUp({email, password}).then( ({session_token, id}) => {
      if (session_token) this.setCurrentUser(session_token, id)
    });
  }

  triangleSignIn(email, password) {
    this.props.SignIn({email, password}).then( ({session_token, id}) => {
      if (session_token) this.setCurrentUser(session_token, id);
    });
  }

  render() {
    const {email, password} = this.state;
    const {errors} = this.props;

    return [
      <View key='AuthForm' style={custom.authForm}>
        <View>
          <TouchableOpacity style={[custom.button, custom.signUp]} onPress={() => this.triangleSignUp(email, password)}></TouchableOpacity>
          <Text style={custom.signUpText} onPress={() => this.triangleSignUp(email, password)}>{`Sign\nUp`}</Text>
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
          <TouchableOpacity style={[custom.button, custom.signIn]} onPress={() => this.triangleSignIn(email, password)}></TouchableOpacity>
          <Text style={custom.signInText} onPress={() => this.triangleSignIn(email, password)}>Sign In</Text>
        </View>
      </View>,
      errors.length > 0 ?
        <View key='Errors' style={custom.errors}>{errors.map(
          err => <Text key={err} style={custom.err}>{`${err}.`}</Text>
        )}</View> : null
    ];
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
