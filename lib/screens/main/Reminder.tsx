import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {signOut} from '../../redux/reducers/userReducer';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from '@rneui/base';
import {RootState} from '../../redux/store/store';
import {useNavigation} from '@react-navigation/native';
import {ColorState} from '../../redux/reducers/colors.reducer';
import ReminderCardView from '../../components/cards/ReminderCardView';

const Reminder = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation();
  const windowDim = Dimensions.get('window');
  const colors = useSelector((state: RootState) => state.colors);

  const styles = useStyles(windowDim, colors);
  const handleSignOut = () => {
    dispatch(signOut());
  };
  const userSelector = useSelector((state: RootState) => state.user);

  navigation.setOptions({
    headerStyle: {
      backgroundColor: colors.colors.background,
    },
    headerTintColor: colors.colors.text,
    title: userSelector.user?.username + "'s Hatırlatsana",
    headerRight: () => (
      <TouchableOpacity onPress={handleSignOut}>
        <Icon name="sign-out" type="font-awesome" color={colors.colors.text} />
      </TouchableOpacity>
    ),
  });

  return (
    <View style={styles.mainView}>
      <Text>Nearest Events</Text>
      <ReminderCardView />
      <ReminderCardView />
      <ReminderCardView />

      <Text>Upcoming</Text>
      <ReminderCardView />
      <ReminderCardView />
      <ReminderCardView />
    </View>
  );
};

const useStyles = (windowDim: any, colors: ColorState) => {
  const ColorSchema = colors.colors;
  const style = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: ColorSchema.background_t,
      alignItems: 'center',
    },
  });
  return style;
};

export default Reminder;
