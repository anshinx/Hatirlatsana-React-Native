import {createSlice} from '@reduxjs/toolkit';

export interface CounterType {
  count: any;
}

const initialState: CounterType = {
  count: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,

  reducers: {
    increment: state => {
      state.count += 1;
    },
    setCount: (state, act) => {
      state.count = act.payload;
    },
  },
});

export const {increment, setCount} = counterSlice.actions;
export default counterSlice.reducer;
