import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import isEmailValid from '../../scripts/email_validator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ip = 'http://192.168.0.15:1881';

interface User {
  name?: string;
  surname?: string;
  username?: string;
  token?: string;
  refresh?: string;
  email?: string;
  exp?: number;
  iat?: number;
  _id?: string;
  email_verified?: boolean;
}
export interface UserType {
  user: User;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  cookies: {
    authToken?: string;
    refToken?: string;
  };
}

const storeToken = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem('@' + key, value);
  } catch (e) {
    console.error(e);
  }
};
const getToken = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem('@' + key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
};

export const fetchUserByToken = createAsyncThunk('fetchUser', async () => {
  var _user;
  if ((await getToken('token')) !== null) {
    const token = await getToken('token');
    const fetchData = await axios.get(ip + '/user/reAuth', {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });

    const refToken = await getToken('refToken');
    const authToken = await getToken('token');
    const {email, created_at, email_verified, name, surname, _id} =
      fetchData.data.user;
    const user = {
      exp: fetchData.data.exp,
      iat: fetchData.data.iat,
      email,
      created_at,
      email_verified,
      name,
      surname,
      _id,
    };
    _user = {
      user,
      headers: {refToken, authToken},
    };
  }
  return _user;
});

const initialState: UserType = {
  user: {},
  cookies: {},
  loading: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUserByToken.fulfilled, (state, action: any) => {
      console.log(action);
      state.user = action.payload;
      state.loading = 'succeeded';
      console.log(state.user);
      console.log(state.loading)
    });
    builder.addCase(fetchUserByToken.pending, (state, action) => {
      console.log(state.loading)
      state.loading = 'pending';
      console.log(state.loading)
    });
  },
  reducers: {
    signIn: (state, action) => {
      var email;
      var username;
      if (isEmailValid(action.payload.usermail)) {
        email = action.payload.usermail;
      } else {
        username = action.payload.usermail;
      }
      axios
        .post(ip + '/user/login', {
          username,
          email,
          password: action.payload.password,
        })
        .then(res => {
          const authToken = res.headers['auth-token'];
          const refToken = res.headers['ref-token'];

          storeToken('token', authToken);
          storeToken('refToken', refToken);
        });
    },

    signUp: () => {},
    signOut: () => {},
    renewToken: () => {},
  },
});

export const {signIn, signUp, signOut, renewToken} = userSlice.actions;

export default userSlice.reducer;
