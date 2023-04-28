import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {ColorSchema} from '../../assets';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';

const AuthCustomButton = ({title, onPressEvent}: any) => {
  const {colors} = useSelector((state: RootState) => state.colors);
  const windowDim = Dimensions.get('window');
  return (
    <View
      style={{
        marginHorizontal: windowDim.width * 0.15,
        alignSelf: 'flex-end',
      }}>
      <Pressable
        android_disableSound={true}
        onPress={() => {
          onPressEvent();
        }}>
        <Text
          style={{
            fontSize: windowDim.fontScale * 17,
            backgroundColor: colors.eYellow,
            padding: windowDim.scale * 2,
            borderRadius: 5,
            color: '#222831',
            fontWeight: 'bold',
            minWidth: windowDim.width * 0.25,
            justifyContent: 'center',
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

export default AuthCustomButton;
