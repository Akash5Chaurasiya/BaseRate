import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import AuthGuard from '@src/auth/AuthGuard';
import Dashboard from '@src/screens/Dashboard/Dashboard';
const Stack = createNativeStackNavigator();




function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthGuard>
          <Stack.Navigator initialRouteName='dashboard'>
            <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="dashboard"
            component={Dashboard}
            />
          </Stack.Navigator>
        </AuthGuard>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}


export default App;
