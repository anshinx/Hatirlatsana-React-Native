import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import Login from './screens/auth/Login';
import {storeConfig} from './redux/store/store';
import {Authentication} from './context/authentication';
import Register from './screens/auth/Register';
import NavController from './nav/NavController';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack: any = createNativeStackNavigator();

  return (
    <Provider store={storeConfig}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={!isDarkMode ? '#fff' : '#000'}
      />
      <NavController />
    </Provider>
  );
}
export default App;
