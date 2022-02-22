import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "app/store/fuse/messageSlice";
// import firebaseService from 'app/services/firebaseService';
import history from "@history";
import ds from "app/services/DataService";
import { setInvitesLoader, setAddUpdateInvitesLoader } from "./loadersSlice";
import { setMineData } from "./mineSlice";

export const getInvites = (req) => async (dispatch) => {
  return ds
    .getMachineInviteService(req)
    .then((resp) => {
      dispatch(setInvitesLoader(false));
      if (resp && resp.statusCode === 200) {
        const { data } = resp;
        dispatch(setInvitesMsg(resp.message));
        // if (resp.message && resp.message.toLowerCase().includes('no record')) {
        //   dispatch(showMessage({ message: resp.message, variant: 'info' }));
        // }
        return dispatch(setInvitesData(data));
      }
      dispatch(setInvitesError(resp.message));
      return dispatch(setInvitesMsg(resp.message));
    })
    .catch((errors) => {
      dispatch(setInvitesLoader(false));
      return dispatch(setInvitesError(errors));
    });
};
// export async function postAddUpdateInvitationData(body) {
//   // debugger;
//   const postAddUpdateInvitation = ds
//     .postAddUpdateInvite(body)
//     .then((resp) => {
//       // dispatch(setMyComputerLoader(false));
//       reset(defaultValues);
//       if (resp && resp.statusCode === 200) {
//         const { data } = resp;
//         //dispatch(setMineMsg(resp.message));
//         setOpenDialog(false);
//       }
//       // dispatch(setMineError(resp.message));
//       // return dispatch(setMineMsg(resp.message));
//     })
//     .catch((errors) => {
//       // dispatch(setMyComputerLoader(false));
//       // return dispatch(setMineError(errors));
//     });
// }
export const postAddUpdateInvitationData =
  (req) => async (dispatch, getState) => {
    return ds
      .postAddUpdateInvite(req)
      .then((resp) => {
        if (resp && resp.statusCode === 200) {
          dispatch(setAddUpdateInvitesLoader(false));
          dispatch(closeNewInviteDialog(false));
          dispatch(closeEditInviteDialog(false));
          // dispatch(setProfileUpdated(true));
          let message =
            req.type == "new"
              ? "Inivitation added Successfully"
              : "Inivitation updated Successfully";

          let getInviteData = getState().auth.mine.data;
          let tempRespData = resp.data.invite;

          let respData = {
            canController: tempRespData.canBeController,
            createdOn: tempRespData.dateCreated,
            dateFrom:tempRespData.dateValidFrom,
            dateTo: tempRespData.dateValidTo,
            description: tempRespData.description,
            id: tempRespData.id,
            inviteId : tempRespData.id,
            isApproved:tempRespData.isApproved,
            isValid: tempRespData.isValid,
            machineId: tempRespData.idtargetMachine,
            machineName: req.machineName,
            needPassword:tempRespData.usePassword,
            secondsToLive: tempRespData.secondsToLive,
            timeToLive: null,
            title: tempRespData.title,
            // userEmail: tempRespData.userEmail, 
            userEmail: req.inviteeEmail, 
            userId:tempRespData.idassignedTo,
            userImage: req.userImage,
            userName: req.type=="new" ? req.inviteeEmail : req.userName
            // key: indexI,
            // id: f.userId,
            // inviteId : f.id,
            // userName: f.userName,
            // userEmail: f.userEmail,
            // userImage: f.userImage,
            // machineID: f.machineId,
            // machineName: f.machineName,
            // title: f.title,
            // createdOn: f.createdOn,
            // canController:f.canController,
            // dateFrom:f.dateFrom,
            // dateTo:f.dateTo,
            // description:f.description,
            // needPassword:f.needPassword,
            // timeToLive:f.timeToLive,
            // isApproved:f.isApproved,
            // isValid:f.isValid
          };
          let inviteData = JSON.parse(JSON.stringify(getInviteData));
          // let inviteData = {...getInviteData};
          for (let index = 0; index < inviteData.records.length; index++) {
            if (inviteData.records[index].userMachine != undefined) {
              let userMachine = inviteData.records[index].userMachine;
              if (userMachine.id === tempRespData.idtargetMachine) {
                let userMachineInvites = inviteData.records[index].userMachineInvites.filter((x) => x.id != tempRespData.id);
                userMachineInvites.push(respData);
                inviteData.records[index].userMachineInvites = [];
                inviteData.records[index].userMachineInvites = userMachineInvites;
              }
            }
          }

          dispatch(setMineData(inviteData));

          return dispatch(
            showMessage({ message: message, variant: "success" })
          );
        } else {
          dispatch(setAddUpdateInvitesLoader(false));
          return dispatch(
            showMessage({ message: "Please Try again later", variant: "info" })
          );
        }
      })
      .catch((errors) => {
        dispatch(setAddUpdateInvitesLoader(false));
        dispatch(closeNewInviteDialog(false));
        dispatch(closeEditInviteDialog(false));
        return dispatch(
          showMessage({ message: "Please Try again later", variant: "error" })
        );
      });
  };
const initialState = {
  data: [],
  msg: "",
  error: [],
  inviteDialog: {
    type: "new",
    props: {
      open: false,
    },
    data: null,
  },
};

const invitesSlice = createSlice({
  name: "auth/invites",
  initialState,
  reducers: {
    setInvitesData: (state, action) => {
      state.data = action.payload;
    },
    setInvitesError: (state, action) => {
      state.error = action.payload;
    },
    setInvitesMsg: (state, action) => {
      state.msg = action.payload;
    },
    openNewInviteDialog: (state, action) => {
      state.inviteDialog = {
        type: "new",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeNewInviteDialog: (state, action) => {
      state.inviteDialog = {
        type: "new",
        props: {
          open: false,
        },
        data: null,
      };
    },
    openEditInviteDialog: (state, action) => {
      state.inviteDialog = {
        type: "edit",
        props: {
          open: true,
        },
        data: action.payload,
      };
    },
    closeEditInviteDialog: (state, action) => {
      state.inviteDialog = {
        type: "edit",
        props: {
          open: false,
        },
        data: null,
      };
    },
    setInvitesToInitial: (state, action) => initialState,
  },
  extraReducers: {},
});

export const {
  setInvitesData,
  setInvitesToInitial,
  setInvitesError,
  setInvitesMsg,
  openNewInviteDialog,
  closeNewInviteDialog,
  openEditInviteDialog,
  closeEditInviteDialog,
} = invitesSlice.actions;

export default invitesSlice.reducer;
