import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Button } from 'react-native';
import { updateUser } from '../../actions/auth';

const mapDispatchToProps = dispatch => ({
  UpdateUser: user => dispatch(updateUser(user))
});

class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', id: props.currentUser.id};
  }

  render() { //style Button
    return <View style={{backgroundColor: '#ffffe6'}}>
      <TextInput placeholder='Name' autoFocus
                 onChangeText={name => this.setState({name})}/>
      <Button title='Save' onClick={() => this.props.UpdateUser(this.state)}/>
    </View>;
  }
}

export default connect(null, mapDispatchToProps)(NewUserForm);
