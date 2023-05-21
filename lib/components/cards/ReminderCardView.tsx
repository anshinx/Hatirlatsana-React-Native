import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';

const ReminderCardView = () => {
  const windowdim = Dimensions.get('window');
  const colors = useSelector((state: RootState) => state.colors);
  const styles = useStyles(windowdim, colors);
  return (
    <TouchableOpacity style={styles.mainView}>
      <View style={styles.row1}>
        <Text style={{color: colors.colors.text}}>Item.Name</Text>
        <Text style={{color: colors.colors.text + '99'}}>Item.date</Text>
      </View>
      <View>
        <Text style={{color: colors.colors.text}}>
          {'Item.descriptionasşbasdjfkşbasdasilfkasdflikkjb'.substring(0, 25) +
            '...'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

function useStyles(windowdim: any, colors: any) {
  return StyleSheet.create({
    mainView: {
      backgroundColor: colors.colors.background,
      width: windowdim.width * 0.9,
      borderRadius: 10,
      borderColor: colors.colors.text,
      borderWidth: 1,
      padding: 10,
      justifyContent: 'flex-start',
      flexDirection: 'row',
    },
    row1: {
      justifyContent: 'space-between',
      width: '40%',
    },
  });
}
export default ReminderCardView;
