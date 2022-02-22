import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commonLoader: true,
  myProfileLoader: true,
  myComputerLoader: true,
  otherComputerLoader: true,
  invitesLoader: true,
  authLoader: false,
  addUpdateInviteLoader : false,
};

const invitesSlice = createSlice({
  name: 'auth/loaders',
  initialState,
  reducers: {
    setCommonLoader: (state, action) => {
      state.commonLoader = action.payload;
    },
    setProfileLoader: (state, action) => {
      state.myProfileLoader = action.payload;
    },
    setMyComputerLoader: (state, action) => {
      state.myComputerLoader = action.payload;
    },
    setOtherComputerLoader: (state, action) => {
      state.otherComputerLoader = action.payload;
    },
    setInvitesLoader: (state, action) => {
      state.invitesLoader = action.payload;
    },
    setAuthLoader: (state, action) => {
      state.authLoader = action.payload;
    },
    setAddUpdateInvitesLoader: (state, action) => {
      state.addUpdateInviteLoader = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setCommonLoader,
  setProfileLoader,
  setMyComputerLoader,
  setOtherComputerLoader,
  setInvitesLoader,
  setAuthLoader,
  setAddUpdateInvitesLoader
} = invitesSlice.actions;

export default invitesSlice.reducer;
