import React from 'react';
import { Switch, Route } from 'react-router-native';
import { AuthRoute, ProtectedRoute } from './utils/routing';
import Home from './screens/Home';

export default () => <Switch>
                       <AuthRoute exact path='/' component={Home}/>
                     </Switch>;
