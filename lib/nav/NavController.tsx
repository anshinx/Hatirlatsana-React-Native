import {View, Text, useColorScheme, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import {useDispatch, useSelector} from 'react-redux';
import {changeTheme} from '../redux/reducers/colors.reducer';
import {RootState} from '../redux/store/store';

import {signInWithTokenAsync, signOut} from '../redux/reducers/userReducer';
import Reminder from '../screens/main/Reminder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from '@rneui/base';

const NavController = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack: any = createNativeStackNavigator();
  const userSelector = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(changeTheme(isDarkMode));
  }, [changeTheme]);

  useEffect(() => {
    console.log(userSelector.loading);
  }, [userSelector.loading]);

  useEffect(() => {
    const subscriber = async () => {
      if ((await AsyncStorage.getItem('authToken')) !== null) {
        const token = await AsyncStorage.getItem('authToken');
        dispatch(signInWithTokenAsync({authToken: token}));
      }
    };
    subscriber();
  }, []);

  useEffect(() => {
    if (userSelector.loading === 'loading' || userSelector.loading === 'idle') {
      console.log('userSelector : ', userSelector.user);
    }
  }, [userSelector.loading]);
  if (userSelector.loading === 'loading') {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Loading...
        </Text>
        <Button
          onPress={() => {
            dispatch(signOut());
          }}>
          Sign Out
        </Button>
      </View>
    );
  } else if (userSelector.user?._id !== undefined) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Hatırlatsana" component={Reminder} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
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
    );
  }
};

export default NavController;
