import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Button, TextInput, AsyncStorage, Text } from 'react-native';
import { width } from '../Home';
import { signUp, signIn } from '../../actions/auth';
import { CURRENT_USER } from '../../App';

const mapStateToProps = ({ errors }) => ({ errors });

const mapDispatchToProps = dispatch => ({
  SignUp: user => dispatch(signUp(user)),
  SignIn: user => dispatch(signIn(user))
});

const custom = StyleSheet.create({
  authForm: {width: width * 0.9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  textInput: {width: width * 0.5},
  error: {textAlign: 'center', width: 300},
});

class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = {email: '', password: ''};
  }

  render() {
    const {email, password} = this.state;
    const {SignUp, SignIn, errors} = this.props;

    return [
      <View key='AuthForm' style={custom.authForm}>
        <Button title='Sign Up' onPress={() => SignUp({email, password})}/>
        <View>
          <TextInput placeholder='Email' defaultValue={email} autoFocus
                     onChange={event => this.setState({email: event.target.value})}
                     style={custom.textInput}/>
          <TextInput placeholder='Password' defaultValue={password}
                     onChange={event => this.setState({password: event.target.value})}
                     style={custom.textInput}/>
        </View>
        <Button title='Sign In' onPress={() => SignIn({email, password}).then(user => AsyncStorage.setItem(CURRENT_USER, user))}/>
      </View>,
      errors.map(err => <Text key={err} style={custom.error}>
                          {`${err}.`}
                        </Text>)
    ];
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
