import {addListener, createSlice} from '@reduxjs/toolkit';
import {NativeEventSubscription} from 'react-native';

export interface ColorState {
  colors: {
    background_t?: string;
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    popup?: string;
    button?: string;
    eYellow?: string;
  };
}

const darkModeColors: ColorState = {
  colors: {
    background: '#222831',
    text: '#ffffff',
    primary: '#ba1200',
    secondary: '#023047',
    popup: '#222831',
    eYellow: '#F0EEED',
    background_t: '#222831ee',
  },
};
const lightModeColors: ColorState = {
  colors: {
    background_t: '#FFFFFF',
    background: '#005082',
    text: '#FFFFFF',
    primary: '#ba1200',
    secondary: '#023047',
    popup: '#345995',
    eYellow: '#00A8CC',
  },
};

const initialState: ColorState = {
  colors: lightModeColors.colors,
};

export const colorsSlice = createSlice({
  name: 'colors',
  initialState,

  reducers: {
    changeTheme: (state, action) => {
      if (action.payload) {
        state.colors = darkModeColors.colors;
      } else state.colors = lightModeColors.colors;
    },
  },
});

export const {changeTheme} = colorsSlice.actions;
export default colorsSlice.reducer;
