import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../reducers/userReducer';
import colorsReducer from '../reducers/colors.reducer';

export const storeConfig = configureStore({
  reducer: {
    colors: colorsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof storeConfig.getState>;

export type AppDispatch = typeof storeConfig.dispatch;
