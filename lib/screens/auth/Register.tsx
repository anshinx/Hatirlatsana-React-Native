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

const Register = () => {
  const useNav: any = useNavigation();
  const windowDim = Dimensions.get('window');
  const styles = useStyles(windowDim);
  const [screenIndex, setScreenIndex] = React.useState(0);
  const handleNav = () => {
    useNav.navigate('Login');
  };

  const firstScreen = [
    <View style={styles.mainView}>
      {/* Fırst Screen (Email) */}
      <Image source={acur} resizeMode="contain" style={styles.image} />
      <View style={styles.inputZone}>
        <Text style={styles.registerText}>Register</Text>
        <Text style={styles.text}>Email</Text>
        <AuthCustomInput
          isHidden={false}
          inputType="email-address"
          placeHolder="Email"
        />

        <View
          style={{
            marginLeft: windowDim.width * 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <TouchableOpacity
              touchSoundDisabled={true}
              style={{justifyContent: 'flex-end'}}
              onPress={() => handleNav()}>
              <Text>Already in? Login</Text>
            </TouchableOpacity>
          </View>
          <AuthCustomButton
            title={'Next'}
            onPressEvent={() => {
              setScreenIndex(1);
            }}
          />
        </View>
      </View>
    </View>,
    <View style={styles.mainView}>
      {/* Screen (Username - Password)*/}
      <Image source={acur} resizeMode="contain" style={styles.image} />
      <View style={styles.inputZone}>
        <Text style={styles.registerText}>Register</Text>
        <Text style={styles.text}>Username</Text>
        <AuthCustomInput
          isHidden={false}
          inputType="email-address"
          placeHolder="Username"
          icon="human"
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
            marginLeft: windowDim.width * 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <TouchableOpacity
              touchSoundDisabled={true}
              style={{justifyContent: 'flex-end'}}
              onPress={() => handleNav()}>
              <Text>Already in? Login</Text>
            </TouchableOpacity>
          </View>
          <AuthCustomButton
            title={'Next'}
            onPressEvent={() => {
              setScreenIndex(2);
            }}
          />
        </View>
      </View>
    </View>,
    <View style={styles.mainView}>
      {/* Screen ( Name - Surname )*/}
      <Image source={acur} resizeMode="contain" style={styles.image} />
      <View style={styles.inputZone}>
        <Text style={styles.registerText}>Register</Text>
        <Text style={styles.text}>Name</Text>
        <AuthCustomInput
          isHidden={false}
          inputType="email-address"
          placeHolder="Email"
        />
        <Text style={styles.text}>Surname</Text>
        <AuthCustomInput
          isHidden={false}
          inputType="email-address"
          placeHolder="Email"
        />

        <View
          style={{
            marginLeft: windowDim.width * 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <TouchableOpacity
              touchSoundDisabled={true}
              style={{justifyContent: 'flex-end'}}
              onPress={() => handleNav()}>
              <Text>Already in? Login</Text>
            </TouchableOpacity>
          </View>
          <AuthCustomButton
            title={'Next'}
            onPressEvent={() => {
              setScreenIndex(0);
            }}
          />
        </View>
      </View>
    </View>,
  ];

  return firstScreen[screenIndex];
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
    registerText: {
      justifyContent: 'center',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: windowDim.fontScale * 25,
      fontStyle: 'normal',
    },
  });
  return styles;
};
export default Register;
