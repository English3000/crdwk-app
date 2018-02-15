import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-native';
import { View, Text } from 'react-native';
import { visitProfile } from '../actions/visit';

const mapStateToProps = ({ users }, { match }) => {
  const pageId = match.params.id;
  return ({user: users[pageId], pageId});
};

const mapDispatchToProps = dispatch => ({
  VisitProfile: id => dispatch(visitProfile(id)),
});

class Profile extends React.Component {
  componentWillMount() { this.props.VisitProfile(this.props.pageId); }

  render() {
    return [
      <Text key='Details' style={{fontStyle: 'italic'}}>
        {this.props.user ? this.props.user.email : ''}
      </Text>,

      <Text key='page'>profile page</Text>
    ];
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
