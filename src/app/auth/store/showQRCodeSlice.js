import { createSlice } from '@reduxjs/toolkit';

export const loadShowQRCode = (isShow) => async (dispatch, getState) => {
  dispatch(setShowQRCode(isShow));
};

const initialState = false;

const showQRCodeSlice = createSlice({
  name: 'auth/showQRCode',
  initialState,
  reducers: {
    setShowQRCode: (state, action) => action.payload,
  },
  extraReducers: {},
});

export const { setShowQRCode } = showQRCodeSlice.actions;

export default showQRCodeSlice.reducer;
