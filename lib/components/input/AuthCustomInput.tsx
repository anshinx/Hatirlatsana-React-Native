import {
  View,
  Text,
  TextInput,
  KeyboardTypeOptions,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {IconType} from '@rneui/base';

interface props {
  isHidden: boolean;
  icon?: string;
  placeHolder?: string;
  inputType?: KeyboardTypeOptions;
  onChange?: Function;
  iconType?: IconType;
}

const AuthCustomInput = ({
  isHidden,
  icon = 'email',
  placeHolder,
  inputType,
  iconType = 'material-community',
  onChange = (e: string) => {
    console.log({'unimplemented on ': placeHolder}, {text: e});
  },
}: props) => {
  const windowDim = Dimensions.get('window');

  const [iColor, setIColor] = React.useState('#000');
  return (
    <View style={{flexDirection: 'row', marginHorizontal: windowDim.scale * 3}}>
      <View
        style={{
          borderWidth: windowDim.scale * 1,
          borderRightWidth: 0,
          borderTopLeftRadius: 21,
          borderBottomLeftRadius: 21,
          height: windowDim.height * 0.061,
          backgroundColor: '#fffffffa',
          width: windowDim.width * 0.12,
          marginVertical: windowDim.scale * 2,
          padding: windowDim.scale * 2,
        }}>
        <Icon type={iconType} name={icon} color={iColor} />
      </View>
      <View
        style={{
          marginVertical: windowDim.scale * 2,
          borderLeftWidth: 0,
          borderWidth: windowDim.scale * 1,
          borderTopRightRadius: 21,
          borderBottomRightRadius: 21,
          paddingVertical: windowDim.scale * 0.1,
          paddingEnd: windowDim.scale * 2,
          height: windowDim.height * 0.061,
          backgroundColor: '#fffffffa',
          width: windowDim.width * 0.8,
        }}>
        <TextInput
          secureTextEntry={isHidden}
          placeholder={placeHolder}
          keyboardType={inputType}
          onFocus={t => {
            setIColor('#00F');
          }}
          onBlur={t => {
            setIColor('#000');
          }}
          style={{color: '#000'}}
          placeholderTextColor="#aaa"
          onChange={e => {
            onChange(e.nativeEvent.text);
          }}
        />
      </View>
    </View>
  );
};

export default AuthCustomInput;
