/* eslint import/no-extraneous-dependencies: off */
import { createSlice } from '@reduxjs/toolkit';
import 'firebase/compat/auth';
import history from '@history';
import _ from '@lodash';
import ds from 'app/services/DataService';
import { showMessage } from 'app/store/fuse/messageSlice';
import { loginError, storeEmail } from './loginSlice';
import { setCommonLoader, setProfileLoader } from './loadersSlice';
import { setInvitesToInitial } from './invitesSlice';
import { setMineToInitial } from './mineSlice';
import { setOtherToInitial } from './otherSlice';

export const getUser = () => async (dispatch) => {
  // return ds
  //   .getUserData()
  //   .then((resp) => {
  //     dispatch(setCommonLoader(false));
  //     dispatch(setProfileLoader(false));
  //     if (resp && resp.tokenData && resp.tokenData.statusCode === 200) {
  //       localStorage.setItem('jwt_access_token', resp.tokenData.jwtToken);
  //       dispatch(setToken(resp.tokenData));
  //       return dispatch(setUserData(resp.profileData.data));
  //     }
  //     dispatch(showMessage({ message: resp.tokenData.message, variant: 'error' }));
  //     return dispatch(logoutUser('logout'));
  //   })
  //   .catch((errors) => {
  //     dispatch(setCommonLoader(false));
  //     dispatch(setProfileLoader(false));
  //     if (errors.response && errors.response.status && errors.response.status === 401) {
  //       dispatch(showMessage({ message: 'Session Expired! Kindly login again', variant: 'error' }));
  //       return dispatch(logoutUser('logout', true));
  //     }
  //     return dispatch(showMessage({ message: 'Something went wrong', variant: 'error' }));
  //   });
};

export const logoutUser = (action, expired) => async (dispatch, getState) => {
  // const { user } = getState().auth;
  if (action === 'logout') {
    history.push({
      pathname: expired ? '/login/expired' : '/',
    });
    dispatch(setUserData({}));
    localStorage.removeItem('jwt_access_token');
    localStorage.clear();
    dispatch(loginError('logout'));
    dispatch(setToken({}));
    dispatch(storeEmail(''));
    dispatch(setMineToInitial());
    dispatch(setInvitesToInitial());
    dispatch(setOtherToInitial());
    return dispatch(userLoggedOut());
  }
  return null;
};

export const uploadPic = (req) => async (dispatch, getState) => {
  return ds
    .postUserPicService(req)
    .then((resp) => {
      if (resp && resp.statusCode === 200 && resp.data) {
        // eslint-disable-next-line prefer-const
        const getUserDetail = getState().auth.user.userData;
        // eslint-disable-next-line prefer-const
        let dataImage = { ...getUserDetail };
        if (dataImage) {
          dataImage.userImage = resp.data;
          dispatch(showMessage({ message: 'Picture Uploaded Successfully', variant: 'success' }));
          return dispatch(setUserData(dataImage));
        }
        return dispatch(showMessage({ message: 'Please Try again later', variant: 'info' }));
      }
      return dispatch(showMessage({ message: 'Please Try again later', variant: 'info' }));
    })
    .catch((errors) => {
      return dispatch(showMessage({ message: 'Please Try again later', variant: 'error' }));
    });
};

export const updateProfile = (req) => async (dispatch) => {
  return ds
    .postUserProfileService(req)
    .then((resp) => {
      if (resp && resp.statusCode === 200) {
        dispatch(setProfileLoader(true));
        dispatch(setProfileUpdated(true));
        dispatch(showMessage({ message: 'Profile Updated Successfully', variant: 'success' }));
        return dispatch(getUser());
      }
      return dispatch(showMessage({ message: 'Please Try again later', variant: 'info' }));
    })
    .catch((errors) => {
      return dispatch(showMessage({ message: 'Please Try again later', variant: 'error' }));
    });
};

export const setUserData = (user) => async (dispatch, getState) => {
  dispatch(setUser(user));
};

const initialState = {
  role: [], // guest
  data: {
    displayName: 'User',
    photoURL: '',
    // photoURL: 'assets/images/avatars/Velazquez.jpg',
    email: 'youremail@example.com',
    shortcuts: ['calendar', 'mail', 'contacts', 'todo'],
  },
  userData: {},
  tokenData: {},
  profileUpdated: false,
};

const userSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setToken: (state, action) => {
      state.tokenData = action.payload;
    },
    setProfileUpdated: (state, action) => {
      state.tokenData = action.payload;
    },
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {},
});

export const { setUser, userLoggedOut, setToken, setProfileUpdated } = userSlice.actions;

export default userSlice.reducer;
