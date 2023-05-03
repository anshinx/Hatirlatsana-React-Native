import {View, Text, useColorScheme} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import {useDispatch, useSelector} from 'react-redux';
import {changeTheme} from '../redux/reducers/colors.reducer';
import {fetchUserByToken} from '../redux/reducers/userReducer';
import {RootState} from '../redux/store/store';
import {isLoading} from 'expo-font';
import {Button} from '@rneui/base';
import {signOut} from '../redux/reducers/userReducer';

const NavController = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack: any = createNativeStackNavigator();
  const userSelector = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(changeTheme(isDarkMode));
  }, [changeTheme]);

  useEffect(() => {
    dispatch(fetchUserByToken());
  }, [userSelector.user]);

  if (userSelector.user) {
    return (
      <View>
        <Button
          title={'Logout'}
          onPress={() => {
            dispatch(signOut());
          }}
        />
      </View>
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
