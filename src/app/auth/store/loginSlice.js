import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
// import firebaseService from 'app/services/firebaseService';
import history from '@history';
import ds from 'app/services/DataService';
// import jwtService from 'app/services/jwtService';
import { setAuthLoader } from 'app/auth/store/loadersSlice';

export const submitLogin = (req) => async (dispatch) => {
  return history.push({
    pathname: '/sheep/dashboards',
  });
  // return ds
  //   .doLogin(req)
  //   .then((resp) => {
  //     dispatch(setAuthLoader(false));
  //     if (resp && resp.statusCode === 200) {
  //       localStorage.setItem('jwt_access_token', resp.jwtToken);
  //       history.push({
  //         pathname: '/sheep/dashboards',
  //       });
  //       dispatch(storeEmail(req.email));
  //       return dispatch(loginSuccess(resp));
  //     }
  //     dispatch(showMessage({ message: resp.message, variant: 'error' }));
  //     return dispatch(loginError(resp.message));
  //   })
  //   .catch((errors) => {
  //     dispatch(setAuthLoader(false));
  //     dispatch(showMessage({ message: 'Kindly recheck Email & Password', variant: 'error' }));
  //     return dispatch(loginError(errors));
  //   });
};

export const forgotPassword = (req) => async (dispatch) => {
  return ds
    .forgotPassService(req)
    .then((resp) => {
      dispatch(setAuthLoader(false));
      if (resp && resp.statusCode === 200) {
        history.push({
          pathname: '/pages/auth/reset-sent',
        });
        return null;
      }
      dispatch(showMessage({ message: resp.message, variant: 'error' }));
      return dispatch(loginError(resp.message));
    })
    .catch((errors) => {
      dispatch(setAuthLoader(false));
      return dispatch(loginError(errors));
    });
};

export const forgotResetPass = (req) => async (dispatch) => {
  return ds
    .forgotResetService(req)
    .then((resp) => {
      dispatch(setAuthLoader(false));
      if (resp && resp.statusCode === 200 && resp.data === 'ok') {
        const body = {
          email: req.email,
          password: req.password,
          rememberMe: true,
        };
        dispatch(setAuthLoader(true));
        return dispatch(submitLogin(body));
      }
      dispatch(showMessage({ message: resp.message, variant: 'error' }));
      return dispatch(loginError(resp.message));
    })
    .catch((errors) => {
      dispatch(setAuthLoader(false));
      return dispatch(loginError(errors));
    });
};

export const userResetPass = (req) => async (dispatch) => {
  return ds
    .postUserResetService(req)
    .then((resp) => {
      dispatch(setAuthLoader(false));
      if (resp && resp.statusCode === 200) {
        if (resp.message && resp.message.includes('successfully')) {
          localStorage.setItem('jwt_access_token', resp.data.jwtToken);
          dispatch(loginSuccess(resp.data));
          return dispatch(showMessage({ message: resp.message, variant: 'success' }));
        }
      }
      return dispatch(showMessage({ message: resp.message, variant: 'error' }));
    })
    .catch((errors) => {
      dispatch(setAuthLoader(false));
      return dispatch(loginError(errors));
    });
};

const initialState = {
  success: false,
  errors: [],
  data: {},
  email: '',
};

const loginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
      state.data = action.payload;
    },
    loginError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
      state.data = {};
      state.email = '';
    },
    storeEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: {},
});

export const { loginSuccess, loginError, data, storeEmail } = loginSlice.actions;

export default loginSlice.reducer;
