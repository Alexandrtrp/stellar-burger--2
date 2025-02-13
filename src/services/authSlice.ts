import {
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../utils/cookie';

export const getUserThunk = createAsyncThunk('auth/getUserThunk', async () =>
  getUserApi()
);

export const registerUserThunk = createAsyncThunk(
  'auth/registerUserThunk',
  async (data: TRegisterData) => registerUserApi(data)
);

export const updateUserThunk = createAsyncThunk(
  'auth/updateUserThunk',
  async (user: TRegisterData) => updateUserApi(user)
);

export const loginUserThunk = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) =>
    await loginUserApi({ email, password })
);

export const logoutThunk = createAsyncThunk('auth/logoutThunk', async () =>
  logoutApi()
);

type TAuth = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  data: TUser;
  loginUserError: null;
  loginUserRequest: boolean;
};

const initialState: TAuth = {
  isAuthChecked: false, // флаг для статуса проверки токена пользователя
  isAuthenticated: false,
  data: {
    email: '',
    name: ''
  },
  loginUserError: null,
  loginUserRequest: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loginUserRequest = false;
        // state.loginUserError = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        setCookie('accessToken', action.payload.accessToken);
      });
    builder
      .addCase(getUserThunk.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(getUserThunk.rejected, (state, action) => {
        console.log(action.payload);
        state.loginUserRequest = false;
        // state.loginUserError = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      });
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        console.log(action.payload);
        state.loginUserRequest = true;
        // state.loginUserError = action.payload;
        state.isAuthChecked = false;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.data = {
          email: '',
          name: ''
        };
        state.loginUserRequest = true;
        state.isAuthenticated = false;
        state.isAuthChecked = false;
        localStorage.setItem('refreshToken', '');
        setCookie('accessToken', '');
      });
  }
});

export const authReducer = authSlice.reducer;
export const {} = authSlice.actions;
