import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Login from './screens/auth/Login';
import {storeConfig} from './redux/store/store';
import {Authentication} from './context/authentication';
import Register from './screens/auth/Register';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack: any = createNativeStackNavigator();

  return (
    <Provider store={storeConfig}>
      <Authentication>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={!isDarkMode ? '#fff' : '#000'}
        />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Authentication>
    </Provider>
  );
}
export default App;
