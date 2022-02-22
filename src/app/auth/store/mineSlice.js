import { createSlice } from '@reduxjs/toolkit';
// import firebaseService from 'app/services/firebaseService';
import ds from 'app/services/DataService';
import { showMessage } from 'app/store/fuse/messageSlice';
import { setMyComputerLoader, setAuthLoader, setCommonLoader } from './loadersSlice';
// import jwtService from 'app/services/jwtService';

export const getMyComputers = (req) => async (dispatch) => {
  return ds
    .getMineMachineService(req)
    .then((resp) => {
      dispatch(setMyComputerLoader(false));
      if (resp && resp.statusCode === 200) {
        const { data } = resp;
        dispatch(setMineMsg(resp.message));
        // if (resp.message && resp.message.toLowerCase().includes('no record')) {
        //   dispatch(showMessage({ message: resp.message, variant: 'info' }));
        // }
        return dispatch(setMineData(data));
      }
      dispatch(setMineError(resp.message));
      return dispatch(setMineMsg(resp.message));
    })
    .catch((errors) => {
      dispatch(setMyComputerLoader(false));
      return dispatch(setMineError(errors));
    });
};

export const mineCompUpdate = (req) => async (dispatch, getState) => {
  return ds
    .mineCompUpdateService(req)
    .then((resp) => {
      dispatch(setAuthLoader(false));
      if (resp && resp.statusCode === 200) {
        // eslint-disable-next-line prefer-const
        const getCompDetail = getState().auth.mine.data;
        // eslint-disable-next-line prefer-const
        let dataDup = { ...getCompDetail };
        // eslint-disable-next-line prefer-const
        let dataComp = [...getCompDetail.records];
        if (dataComp && dataComp.length > 0) {
          const index = dataComp.indexOf(dataComp.filter((a) => a.userMachine.id === req.id)[0]);
          const repData = dataComp.filter((a) => a.userMachine.id === req.id)[0];
          // eslint-disable-next-line prefer-const
          let putData = { ...repData };
          // eslint-disable-next-line prefer-const
          let putMachineData = { ...putData.userMachine };
          putMachineData.machineName = req.title;
          putData.userMachine = putMachineData;
          dataComp[index] = putData;
          dataDup.records = dataComp;
          dispatch(showMessage({ message: 'Updated Successfully', variant: 'success' }));
          return dispatch(setMineData(dataDup));
        }
        return dispatch(showMessage({ message: 'Please Try again later', variant: 'info' }));
      }
      return dispatch(showMessage({ message: 'Please Try again later', variant: 'info' }));
    })
    .catch((errors) => {
      dispatch(setAuthLoader(false));
      return dispatch(showMessage({ message: 'Please Try again later', variant: 'error' }));
    });
};

export const getStats = () => async (dispatch) => {
  return ds
    .getStatsService()
    .then((resp) => {
      dispatch(setCommonLoader(false));
      if (resp && resp.statusCode === 200) {
        const { data } = resp;
        dispatch(setMineMsg(resp.message));
        return dispatch(setStats(data));
      }
      dispatch(setMineError(resp.message));
      return dispatch(setMineMsg(resp.message));
    })
    .catch((errors) => {
      dispatch(setCommonLoader(false));
      return dispatch(setMineError(errors));
    });
};

export const removeAllAdmin = (id) => async (dispatch, getState) => {
  return ds
    .removeAllAdminService(id)
    .then((resp) => {
      dispatch(setMyComputerLoader(false));
      if (resp && resp.statusCode === 200) {
        const getAdminDel = getState().auth.mine.data;
        // eslint-disable-next-line prefer-const
        let delDataAdmin = JSON.parse(JSON.stringify(getAdminDel));
        const index = delDataAdmin.records.indexOf(
          delDataAdmin.records.filter((a) => a.userMachine.id === id)[0]
        );
        // eslint-disable-next-line prefer-const
        let finalList = [];
        delDataAdmin.records[index].userMachineAdmins = finalList;
        dispatch(showMessage({ message: 'Removed Successfully', variant: 'success' }));
        return dispatch(setMineData(delDataAdmin));
      }
      return dispatch(showMessage({ message: resp.message, variant: 'info' }));
    })
    .catch((errors) => {
      dispatch(setMyComputerLoader(false));
      return dispatch(showMessage({ message: 'Something went wrong', variant: 'error' }));
    });
};

export const removeSpecificAdmin = (body) => async (dispatch, getState) => {
  return ds
    .removeAdminService(body)
    .then((resp) => {
      dispatch(setMyComputerLoader(false));
      if (resp && resp.statusCode === 200) {
        const getAdminDel = getState().auth.mine.data;
        // eslint-disable-next-line prefer-const
        let delDataAdmin = JSON.parse(JSON.stringify(getAdminDel));
        const index = delDataAdmin.records.indexOf(
          delDataAdmin.records.filter((a) => a.userMachine.id === body.machineId)[0]
        );
        // eslint-disable-next-line prefer-const
        let finalList = delDataAdmin.records
          .filter((zx) => zx.userMachine.id === body.machineId)[0]
          .userMachineAdmins.filter((op) => op.id !== body.id);
        delDataAdmin.records[index].userMachineAdmins = finalList;
        dispatch(showMessage({ message: 'Removed Successfully', variant: 'success' }));
        return dispatch(setMineData(delDataAdmin));
      }
      return dispatch(showMessage({ message: resp.message, variant: 'info' }));
    })
    .catch((errors) => {
      dispatch(setMyComputerLoader(false));
      return dispatch(showMessage({ message: 'Something went wrong', variant: 'error' }));
    });
};

export const addEditAdmin = (body) => async (dispatch, getState) => {
  return ds
    .addUpdateAdminService(body)
    .then((resp) => {
      dispatch(setAuthLoader(false));
      if (resp && resp.statusCode === 200) {
        const getAdminDetail = getState().auth.mine.data;
        // eslint-disable-next-line prefer-const
        let dupDataAdmin = JSON.parse(JSON.stringify(getAdminDetail));
        if (dupDataAdmin) {
          const index = dupDataAdmin.records.indexOf(
            dupDataAdmin.records.filter((a) => a.userMachine.id === body.machineId)[0]
          );
          // eslint-disable-next-line prefer-const
          let dupAdminList = dupDataAdmin.records.filter(
            (a) => a.userMachine.id === body.machineId
          )[0];
          if (body.id) {
            if (dupAdminList.userMachineAdmins.filter((we) => we.id === body.id).length > 0) {
              dupAdminList.userMachineAdmins.filter((we) => we.id === body.id)[0].userEmail =
                body.email;
              dupAdminList.userMachineAdmins.filter((we) => we.id === body.id)[0].grantFuther =
                body.grantFuther;
            } else {
              return dispatch(showMessage({ message: 'Please try again later', variant: 'info' }));
            }
          } else {
            const bodie = {
              createdOn: Date.now(),
              userId: resp.data.granteeId,
              machineId: resp.data.machineId,
              userEmail: body.email,
              userName: body.email,
              userImage: undefined,
              machineName: '',
              id: resp.data.id,
            };
            dupAdminList.userMachineAdmins.push(bodie);
          }
          dupDataAdmin[index] = dupAdminList;
          dispatch(showMessage({ message: 'Operation Successful', variant: 'success' }));
          return dispatch(setMineData(dupDataAdmin));
        }
      }
      return dispatch(showMessage({ message: resp.message, variant: 'info' }));
    })
    .catch((errors) => {
      dispatch(setAuthLoader(false));
      return dispatch(showMessage({ message: 'Something went wrong', variant: 'error' }));
    });
};

export const removeAllInvite = (machineID) => async (dispatch, getState) => {
  return ds
    .removeALLInviteService(machineID)
    .then((resp) => {
      dispatch(setMyComputerLoader(false));
      if (resp && resp.statusCode === 200) {
        const getAdminDel = getState().auth.mine.data;
        // eslint-disable-next-line prefer-const
        let delDataAdmin = JSON.parse(JSON.stringify(getAdminDel));
        const index = delDataAdmin.records.indexOf(
          delDataAdmin.records.filter((a) => a.userMachine.id === machineID)[0]
        );
        // eslint-disable-next-line prefer-const
        let finalList = [];
        delDataAdmin.records[index].userMachineInvites = finalList;
        dispatch(showMessage({ message: 'Removed Successfully', variant: 'success' }));
        return dispatch(setMineData(delDataAdmin));
      }
      return dispatch(showMessage({ message: resp.message, variant: 'info' }));
    })
    .catch((errors) => {
      dispatch(setMyComputerLoader(false));
      return dispatch(showMessage({ message: 'Something went wrong', variant: 'error' }));
    });
};

export const removeSpecificInvite = (id, machineID) => async (dispatch, getState) => {
  return ds
    .removeSpecificInviteService(id, machineID)
    .then((resp) => {
      dispatch(setMyComputerLoader(false));
      if (resp && resp.statusCode === 200) {
        const getAdminDel = getState().auth.mine.data;
        // eslint-disable-next-line prefer-const
        let delDataAdmin = JSON.parse(JSON.stringify(getAdminDel));
        const index = delDataAdmin.records.indexOf(
          delDataAdmin.records.filter((a) => a.userMachine.id === machineID)[0]
        );
        // eslint-disable-next-line prefer-const
        let finalList = delDataAdmin.records
          .filter((zx) => zx.userMachine.id === machineID)[0]
          .userMachineInvites.filter((op) => op.id !== id);
        delDataAdmin.records[index].userMachineInvites = finalList;
        dispatch(showMessage({ message: 'Removed Successfully', variant: 'success' }));
        return dispatch(setMineData(delDataAdmin));
      }
      return dispatch(showMessage({ message: resp.message, variant: 'info' }));
    })
    .catch((errors) => {
      dispatch(setMyComputerLoader(false));
      return dispatch(showMessage({ message: 'Something went wrong', variant: 'error' }));
    });
};

const initialState = {
  data: [],
  msg: '',
  error: [],
  stats: {},
};

const mineSlice = createSlice({
  name: 'auth/mine',
  initialState,
  reducers: {
    setMineData: (state, action) => {
      state.data = action.payload;
    },
    setMineError: (state, action) => {
      state.error = action.payload;
    },
    setMineMsg: (state, action) => {
      state.msg = action.payload;
    },
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setMineToInitial: (state, action) => initialState,
  },
  extraReducers: {},
});

export const { setMineData, setMineMsg, setMineToInitial, setMineError, setStats } =
  mineSlice.actions;

export default mineSlice.reducer;
