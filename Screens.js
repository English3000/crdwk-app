import React from 'react';
import { Switch, Route } from 'react-router-native';
import { AuthRoute, ProtectedRoute } from './utils/routing';
import Home from './screens/Home';
import Profile from './screens/Profile';

export default () => <Switch>
                       <AuthRoute exact path='/' component={Home}/>
                       <Route exact path='/users/:id' component={Profile}/>
                     </Switch>;
