import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../reducers/counterReducer';

export const storeConfig = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof storeConfig.getState>;

export type AppDispatch = typeof storeConfig.dispatch;
