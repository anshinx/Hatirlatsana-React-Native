import {View, Text} from 'react-native';
import React from 'react';
import {signOut} from '../../redux/reducers/userReducer';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '@rneui/base';
import {RootState} from '../../redux/store/store';

const Reminder = () => {
  const dispatch = useDispatch<any>();
  const userSelector = useSelector((state: RootState) => state.user);
  console.log(userSelector.user);
  return (
    <View>
      <Text>Welcome {userSelector.user?.user?.name}</Text>
      <Button
        onPress={() => {
          dispatch(signOut());
        }}
      />
    </View>
  );
};

export default Reminder;
