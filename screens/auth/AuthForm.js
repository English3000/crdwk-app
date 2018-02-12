import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, Button, TextInput, AsyncStorage, Text } from 'react-native';
import { signUp, signIn } from '../../actions/auth';
import { CURRENT_USER } from '../../App';

const mapStateToProps = ({ errors }) => ({ errors });

const mapDispatchToProps = dispatch => ({
  SignUp: user => dispatch(signUp(user)),
  SignIn: user => dispatch(signIn(user))
});

const { width } = Dimensions.get('window');

const custom = StyleSheet.create({
  authForm: { width: width * 0.925, flexDirection: 'row', alignItems: 'center',
              justifyContent: 'space-between' },
  textInput: {width: width * 0.5},
  errors: {marginVertical: 12.5},
  err: {textAlign: 'center', width: width * 0.925},
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
      errors.length > 0 ?
        <View key='Errors' style={custom.errors}>{errors.map(
          err => <Text key={err} style={custom.err}>{`${err}.`}</Text>
        )}</View> : null
    ];
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
