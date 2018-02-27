import React from 'react';
import { View, Text } from 'react-native';
import AuthForm from './AuthForm';
import { ErrorBoundary } from '../../utils/elements';

export default () => <View style={{alignItems: 'center', paddingBottom: 10, backgroundColor: '#ffff99'}}>
                       <Text style={{fontWeight: '700'}}>crdwk</Text>

                       <ErrorBoundary>
                         <AuthForm />
                       </ErrorBoundary>

                       <Text>Make it happen.</Text>
                     </View>;
