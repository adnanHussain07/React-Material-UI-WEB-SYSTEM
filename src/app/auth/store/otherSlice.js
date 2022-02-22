import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
// import firebaseService from 'app/services/firebaseService';
import history from '@history';
import ds from 'app/services/DataService';
import { setOtherComputerLoader } from './loadersSlice';

export const getOtherComputers = (req) => async (dispatch) => {
  return ds
    .getOtherMachineService(req)
    .then((resp) => {
      dispatch(setOtherComputerLoader(false));
      if (resp && resp.statusCode === 200) {
        const { data } = resp;
        dispatch(setOtherMsg(resp.message));
        // if (resp.message && resp.message.toLowerCase().includes('no record')) {
        //   dispatch(showMessage({ message: resp.message, variant: 'info' }));
        // }
        return dispatch(setOtherData(data));
      }
      dispatch(setOtherError(resp.message));
      return dispatch(setOtherMsg(resp.message));
    })
    .catch((errors) => {
      dispatch(setOtherComputerLoader(false));
      return dispatch(setOtherError(errors));
    });
};

const initialState = {
  data: [],
  msg: '',
  error: [],
};

const otherSlice = createSlice({
  name: 'auth/other',
  initialState,
  reducers: {
    setOtherData: (state, action) => {
      state.data = action.payload;
    },
    setOtherError: (state, action) => {
      state.error = action.payload;
    },
    setOtherMsg: (state, action) => {
      state.msg = action.payload;
    },
    setOtherToInitial: (state, action) => initialState,
  },
  extraReducers: {},
});

export const { setOtherData, setOtherError, setOtherMsg, setOtherToInitial } = otherSlice.actions;

export default otherSlice.reducer;
