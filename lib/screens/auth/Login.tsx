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
import React from 'react';
import {ColorSchema} from '../../assets';
import AuthCustomInput from '../../components/input/AuthCustomInput';
import {acur} from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import AuthCustomButton from '../../components/button/AuthCustomButton';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const windowDim = Dimensions.get('window');
  const useNav: any = useNavigation();
  const styles = useStyles(windowDim);

  const handleNav = () => {
    useNav.navigate('Register');
  };

  return (
    <View style={styles.mainView}>
      <Image source={acur} resizeMode="contain" style={styles.image} />
      <View style={styles.inputZone}>
        <Text style={styles.loginText}>LOGIN</Text>
        <Text style={styles.text}>Email</Text>
        <AuthCustomInput
          isHidden={false}
          inputType="email-address"
          placeHolder="Email"
        />
        <Text style={styles.text}>Password</Text>
        <AuthCustomInput
          isHidden={true}
          placeHolder="Password"
          icon="lock"
          iconType="font-awesome"
        />
        <View
          style={{
            marginHorizontal: windowDim.width * 0.05,
            flexDirection: 'row',
          }}>
          <View>
            <TouchableOpacity touchSoundDisabled={true}>
              <Text>Forget Password ?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              touchSoundDisabled={true}
              onPress={() => handleNav()}>
              <Text>New around here ? Register</Text>
            </TouchableOpacity>
          </View>
          <AuthCustomButton title={'Login'} />
        </View>
      </View>
    </View>
  );
};
const useStyles = (windowDim: ScaledSize) => {
  const styles = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: '#fff',
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
      fontWeight: 'bold',
      fontSize: windowDim.fontScale * 25,
      fontStyle: 'normal',
    },
  });
  return styles;
};

export default Login;
