import React from 'react';
import { Switch, Route } from 'react-router-native';
import Home from './screens/Home';

export default () => <Switch>
                       <Route exact path='/' component={Home}/>
                     </Switch>;
