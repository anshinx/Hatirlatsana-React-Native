import {View, Text, useColorScheme, ActivityIndicator} from 'react-native';
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
import Reminder from '../screens/main/Reminder';

const NavController = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack: any = createNativeStackNavigator();
  const userSelector = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<any>();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    dispatch(changeTheme(isDarkMode));
  }, [changeTheme]);

  useEffect(() => {
    if (userSelector.loading === 'loading' || userSelector.loading === 'idle') {
      dispatch(fetchUserByToken());
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
      </View>
    );
  } else if (userSelector.user) {
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
