import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import {ColorSchema} from '../../assets';

const AuthCustomButton = ({title, onPressEvent}: any) => {
  const windowDim = Dimensions.get('window');
  return (
    <View
      style={{
        marginHorizontal: windowDim.width * 0.15,
        alignSelf: 'flex-end',
      }}>
      <TouchableOpacity
        onPress={() => {
          onPressEvent();
        }}>
        <Text
          style={{
            fontSize: windowDim.fontScale * 17,
            backgroundColor: ColorSchema.secondary + 'dd',
            padding: windowDim.scale * 2,
            borderRadius: 5,
            color: ColorSchema.text,
            minWidth: windowDim.width * 0.25,
            justifyContent: 'center',
            textAlign: 'center',
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthCustomButton;
