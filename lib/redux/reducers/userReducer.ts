import {createSlice} from '@reduxjs/toolkit';

export interface UserType {
  user: {
    username?: string;
    token?: string;
    refresh?: string;
    email?: string;
  };
}

const initialState: UserType = {
  user: {},
};



export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: () => {},
    signUp: () => {},
    logOut: () => {},
    renewToken: () => {},
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
