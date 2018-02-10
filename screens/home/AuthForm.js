import React from 'react';
import { connect } from 'react-redux';
import { Dimensions, StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { signUp, signIn } from '../../actions/auth';

const mapStateToProps = ({ errors }) => ({ errors });

const mapDispatchToProps = dispatch => ({
  SignUp: user => dispatch(signUp(user)),
  SignIn: user => dispatch(signIn(user))
});

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  authForm: {width: width * 0.9, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  textInput: {width: width * 0.5},
});

class AuthForm extends React.Component {
  constructor() {
    super();
    this.state = {email: '', password: ''};
  }

  render() {
    const {email, password} = this.state;
    const {SignUp, SignIn, errors} = this.props;

    console.log(errors);

    return [
      <View key='AuthForm' style={styles.authForm}>
        <Button title='Sign Up' onPress={() => SignUp({email, password})}/>
        <View>
          <TextInput placeholder='Email' defaultValue={email} autoFocus
                     onChange={event => this.setState({email: event.target.value})}
                     style={styles.textInput}/>
          <TextInput placeholder='Password' defaultValue={password}
                     onChange={event => this.setState({password: event.target.value})}
                     style={styles.textInput}/>
        </View>
        <Button title='Sign In' onPress={() => SignIn({email, password})}/>
      </View>,
      errors.map(err => <Text key={err} style={{textAlign: 'center', width: 300}}>
                          {`${err}.`}
                        </Text>)
    ];
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
