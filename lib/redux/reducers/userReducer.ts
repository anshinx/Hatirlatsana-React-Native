import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import isEmailValid from '../../scripts/email_validator';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ip = 'http://192.168.0.15:1881';

export interface UserType {
  user?: {
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
    headers?: {
      authToken?: string;
      refToken?: string;
    };
  };
  loading: 'loading' | 'idle' | 'pending' | 'succeeded' | 'failed';
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

const renewToken = async () => {
  try {
    const refToken = await getToken('refToken');

    const fetchData = await axios.get(ip + '/user/refresh', {
      data: {refreshToken: refToken},
    });
    const authToken = fetchData.headers['auth-token'];
    const refToken2 = fetchData.headers['ref-token'];
    console.log("token reneved")
    storeToken('token', authToken);
    storeToken('refToken', refToken2);
    
  } catch (error) {
    console.error(error);
  }

};

export const fetchUserByToken = createAsyncThunk('fetchUser', async () => {
  try {
    var _user;

    const token = await getToken('token');

    if ((await getToken('token')) !== undefined) {
      var fetchData = await axios.get(ip + '/user/reAuth', {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (fetchData.data.err === 'EXPIRED_TOKEN') {
        renewToken().then(() => {
          fetchUserByToken();
        });
      }
      const refToken = await getToken('refToken');
      const authToken = await getToken('token');
      const {email, created_at, email_verified, name, surname, _id} =
        fetchData.data;
      console.log(fetchData.data);
      const user = {
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
  } catch (error) {
    console.error(error);
  }
});

const initialState: UserType = {
  user: undefined,
  cookies: {},
  loading: 'loading',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUserByToken.fulfilled, (state, action: any) => {
      state.user = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchUserByToken.pending, (state, action) => {
      state.loading = 'loading';
    });
    builder.addCase(fetchUserByToken.rejected, (state, action) => {
      console.log(state.user);
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
    signOut: state => {
      AsyncStorage.removeItem('@token');
      AsyncStorage.removeItem('@refToken');
      state.loading = 'pending';
      state.user = {};
      state.loading = 'idle';
    },
  },
});

export const {signIn, signUp, signOut} = userSlice.actions;

export default userSlice.reducer;
