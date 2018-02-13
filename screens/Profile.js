import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import { visitProfile } from '../actions/visit';
import { View, Text } from 'react-native';
import Header from './auth/Header';
import styles from '../utils/styles';

const mapStateToProps = ({ users }, ownProps) => ({
  user: users[ownProps.match.params.id],
});

const mapDispatchToProps = dispatch => ({
  VisitProfile: id => dispatch(visitProfile(id)),
});

class Profile extends React.Component {
  componentWillMount() { this.props.VisitProfile(this.props.pageId); }

  render() {
    return [
      <Header key='Header'/>,
      this.props.user ? <Text key='Details'>{this.props.user.email}</Text> :
                          <Text key='Loading'>loading</Text>,
      <View key='Profile' style={styles.centered}>
        <Text>Profile Page</Text>
      </View>
    ];
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
