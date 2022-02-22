import { createSlice } from '@reduxjs/toolkit';
// import firebaseService from 'app/services/firebaseService';
// import jwtService from 'app/services/jwtService';
import ds from 'app/services/DataService';
import history from '@history';
import { showMessage } from 'app/store/fuse/messageSlice';
import { setAuthLoader } from 'app/auth/store/loadersSlice';

export const submitRegister = (req) => async (dispatch) => {
  return ds
    .doRegister(req)
    .then((resp) => {
      dispatch(setAuthLoader(false));
      if (resp && resp.message) {
        if (resp.message.includes('confirm your email')) {
          history.push({
            pathname: '/pages/auth/mail-confirm',
          });
        } else {
          dispatch(showMessage({ message: resp.message, variant: 'info' }));
        }
      }
      // return dispatch(registerSuccess());
    })
    .catch((errors) => {
      dispatch(showMessage({ message: 'Something went wrong...', variant: 'error' }));
      dispatch(setAuthLoader(false));
      return dispatch(registerError(errors));
    });
};

const initialState = {
  success: false,
  errors: [],
};

const registerSlice = createSlice({
  name: 'auth/register',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    registerError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
