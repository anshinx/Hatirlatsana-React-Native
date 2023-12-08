import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import isEmailValid from '../../scripts/email_validator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {act} from 'react-test-renderer';

const ip = 'http://192.168.137.1-:1881';

export interface UserType {
  err?: string;
  user?: {
    name?: string;
    surname?: string;
    username?: string;
    email?: string;
    exp?: number;
    iat?: number;
    _id?: string;
    email_verified?: boolean;
  };
  loading: 'loading' | 'idle' | 'pending' | 'succeeded' | 'failed';
  cookies: {
    authToken?: string;
    refToken?: string;
  };
}

export const signInAsync = createAsyncThunk(
  'user/signIn/',
  async (data: {usermail: string; password: string}) => {
    var _user;
    var username;
    var email;

    if (isEmailValid(data.usermail)) {
      email = data.usermail;
    } else {
      username = data.usermail;
    }

    const fetchedData = await axios
      .post(`${ip}/api/auth/login`, {
        username: username,
        email: email,
        password: data.password,
      })
      .catch(err => console.log(err.response.data));
    console.log(fetchedData);
    await AsyncStorage.setItem('authToken', fetchedData?.headers['auth-token'])
      .then(() => {
        console.log('authToken saved');
      })
      .catch(err => console.log(err));

    await AsyncStorage.setItem('refToken', fetchedData?.headers['ref-token'])
      .then(() => {
        console.log('refToken saved');
      })
      .catch(err => console.log(err));

    const {exp, iat, user} = fetchedData?.data;
    const {name, surname, email_verified, _id} = user;
    _user = {
      name,
      surname,
      username,
      email,
      email_verified,
      exp,
      iat,
      _id,
    };

    return _user;
  },
);
export const signUpAsync = createAsyncThunk(
  'user/signUp/',
  async (data: {
    name: string;
    surname: string;
    username: string;
    email: string;
    password: string;
  }) => {
    if (!isEmailValid(data.email)) console.log('email is not valid');
    var _user;
    const RegisterFetch = await axios
      .post(`${ip}/api/auth/create`, {
        name: data.name,
        surname: data.surname,
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .catch(err => console.log(err.response.data));
    console.log(RegisterFetch?.headers);

    AsyncStorage.setItem('authToken', RegisterFetch?.headers['auth-token'])
      .then(() => {
        console.log('authToken saved');
      })
      .catch(err => console.log(err));

    await AsyncStorage.setItem('refToken', RegisterFetch?.headers['ref-token'])
      .then(() => {
        console.log('refToken saved');
      })
      .catch(err => console.log(err));

    const refreshToken = await AsyncStorage.getItem('refToken');
    const refreshingSession = await axios
      .post(`${ip}/api/auth/refresh`, {
        refreshToken: refreshToken,
      })
      .catch(err => console.log('SIWT ERR: ', err.response.data));
    await AsyncStorage.setItem(
      'authToken',
      refreshingSession?.headers['auth-token'],
    )
      .then(() => {
        console.log('authToken saved');
      })

      .catch(err => console.log(err));
    await AsyncStorage.setItem(
      'refToken',
      refreshingSession?.headers['ref-token'],
    )
      .then(() => {
        console.log('refToken saved');
      })
      .catch(err => console.log('SIWT REF', err));
    const fetchedData = await axios
      .get(`${ip}/api/auth/reAuth`, {
        headers: {
          Authorization: `Bearer ${refreshingSession?.headers['auth-token']}`,
        },
      })
      .catch(err => console.log('SIWT REAUTH : ', err.response.data));

    const {exp, iat, user} = fetchedData?.data;
    const {name, surname, username, email, email_verified, _id} = user;
    _user = {
      name,
      surname,
      username,
      email,
      email_verified,
      exp,
      iat,
      _id,
    };
    return _user;
  },
);

export const signInWithTokenAsync = createAsyncThunk(
  'user/signInWithToken/',
  async (data: {authToken: any}) => {
    let _user;
    const refreshToken = await AsyncStorage.getItem('refToken');
    const refreshingSession = await axios
      .post(`${ip}/api/auth/refresh`, {
        refreshToken: refreshToken,
      })
      .catch(err => console.log('SIWT ERR: ', err.response.data));
    await AsyncStorage.setItem(
      'authToken',
      refreshingSession?.headers['auth-token'],
    )
      .then(() => {
        console.log('authToken saved');
      })

      .catch(err => console.log(err));
    await AsyncStorage.setItem(
      'refToken',
      refreshingSession?.headers['ref-token'],
    )
      .then(() => {
        console.log('refToken saved');
      })
      .catch(err => console.log('SIWT REF', err));
    const fetchedData = await axios
      .get(`${ip}/api/auth/reAuth`, {
        headers: {
          Authorization: `Bearer ${refreshingSession?.headers['auth-token']}`,
        },
      })
      .catch(err => console.log('SIWT REAUTH : ', err.response.data));

    const {exp, iat, user} = fetchedData?.data;
    const {name, surname, username, email, email_verified, _id} = user;
    _user = {
      name,
      surname,
      username,
      email,
      email_verified,
      exp,
      iat,
      _id,
    };
    return _user;
  },
);

const initialState: UserType = {
  user: undefined,
  cookies: {},
  loading: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(signInAsync.pending, state => {
        state.loading = 'loading';
        console.log('waiting for server response');
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = action.payload;
        console.log('payload : ', action.payload);
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = 'idle';
        console.log(action.payload);
        console.log('rejected');
        state.err = 'Rejection Error';
      });

    builder
      .addCase(signInWithTokenAsync.pending, state => {
        state.loading = 'loading';
        console.log('waiting for server response');
      })
      .addCase(signInWithTokenAsync.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = action.payload;
        console.log('payload : ', action.payload);

        console.log('fulfilled');
      })
      .addCase(signInWithTokenAsync.rejected, (state, action) => {
        state.loading = 'idle';
        console.log('SIWT', action.payload);
      });

    builder
      .addCase(signUpAsync.pending, state => {
        state.loading = 'loading';
        console.log('waiting for server response');
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.loading = 'idle';

        state.user = action.payload;

        console.log('fulfilled');
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.loading = 'idle';
        console.log('SUA', action.payload);
      });
  },
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
      state.loading = 'idle';
    },
    signUp: (state, action) => {
      state.user = action.payload;
      state.loading = 'idle';
    },
    signOut: state => {
      state.user = undefined;
      AsyncStorage.removeItem('authToken');
      AsyncStorage.removeItem('refToken');
      state.loading = 'idle';
    },
  },
});

export const {signIn, signUp, signOut} = userSlice.actions;

export default userSlice.reducer;
