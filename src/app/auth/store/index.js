import { combineReducers } from '@reduxjs/toolkit';
import login from './loginSlice';
import register from './registerSlice';
import user from './userSlice';
import showQR from './showQRCodeSlice';
import mine from './mineSlice';
import other from './otherSlice';
import invites from './invitesSlice';
import loaders from './loadersSlice';

const authReducers = combineReducers({
  user,
  login,
  register,
  showQR,
  mine,
  other,
  invites,
  loaders,
});

export default authReducers;
