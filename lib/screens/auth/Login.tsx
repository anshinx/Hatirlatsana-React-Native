import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScaledSize,
} from 'react-native';
import React, {useEffect} from 'react';
import AuthCustomInput from '../../components/input/AuthCustomInput';
import {acur} from '../../assets';
import AuthCustomButton from '../../components/button/AuthCustomButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {ColorState} from '../../redux/reducers/colors.reducer';
import {signInAsync} from '../../redux/reducers/userReducer';

const Login = () => {
  const windowDim = Dimensions.get('window');
  const useNav: any = useNavigation();
  const colors = useSelector((state: RootState) => state.colors);

  const styles = useStyles(windowDim, colors);
  const [creds, setCreds] = React.useState({} as any);
  const handleNav = () => {
    useNav.navigate('Register');
  };
  const userSelector = useSelector((state: RootState) => state.user);
  const dispatch: any = useDispatch();

  const handleSignIn = (creds: any, dispatch: any) => {
    dispatch(signInAsync(creds));
    console.log('pressed');
  };

  return (
    <View style={styles.mainView}>
      <Image source={acur} resizeMode="contain" style={styles.image} />
      <View style={styles.inputZone}>
        <Text style={styles.loginText}>LOGIN</Text>
        <Text style={styles.text}>Username/Email</Text>
        <AuthCustomInput
          isHidden={false}
          inputType="email-address"
          placeHolder="Username/Email"
          icon="user"
          iconType="font-awesome"
          onChange={(e: string) => {
            setCreds({...creds, usermail: e});
          }}
        />
        <Text style={styles.text}>Password</Text>
        <AuthCustomInput
          isHidden={false}
          placeHolder="Password"
          icon="lock"
          iconType="font-awesome"
          onChange={(e: string) => {
            setCreds({...creds, password: e});
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <TouchableOpacity touchSoundDisabled={true}>
              <Text style={styles.text}>Forget Password ?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              touchSoundDisabled={true}
              onPress={() => handleNav()}>
              <Text style={styles.text}>New around here ? Register</Text>
            </TouchableOpacity>
          </View>
          <AuthCustomButton
            title={'Login'}
            onPressEvent={async () => {
              handleSignIn(creds, dispatch);
            }}
          />
        </View>
      </View>
    </View>
  );
};
const useStyles = (windowDim: ScaledSize, colors: ColorState) => {
  const ColorSchema = colors.colors;
  const styles = StyleSheet.create({
    mainView: {
      flex: 1,
    },
    image: {
      width: windowDim.width,
      height: windowDim.height * 0.27,
      position: 'absolute',
      top: windowDim.scale * 2,
    },
    inputZone: {
      flex: 1,
      flexGrow: 1,
      marginTop: windowDim.height * 0.33,
      backgroundColor: ColorSchema.background,
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
      paddingTop: 25,
    },
    text: {
      color: ColorSchema.text,
      marginHorizontal: windowDim.scale * 4,
    },
    loginText: {
      justifyContent: 'center',
      textAlign: 'center',
      fontWeight: '900',
      fontSize: windowDim.fontScale * 25,
      fontStyle: 'italic',
      color: ColorSchema.text + 'ff',
    },
  });
  return styles;
};

export default Login;
