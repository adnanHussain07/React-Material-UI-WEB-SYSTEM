import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import {
  removeAllAdmin,
  removeSpecificAdmin,
  removeAllInvite,
  removeSpecificInvite,
} from 'app/auth/store/mineSlice';
import { setMyComputerLoader } from 'app/auth/store/loadersSlice';
import { useDispatch, useSelector } from 'react-redux';

const allAdminHead = 'Are you sure you want to delete ALL ADMINS ?';
const allAdminDesc =
  'By clicking on Agree button, all admins for this machine will be removed, please make sure before clicking on Agree button, if you do not want to remove all admins kindly click on disagree.';

const specificAdminHead = 'Are you sure you want to delete this ADMIN ?';
const specificAdminDesc =
  'By clicking on Agree button, this admin will be removed, please make sure before clicking on Agree button, if you do not want to remove this admin kindly click on disagree.';

const allInviteHead = 'Are you sure you want to delete ALL INVITES ?';
const allInviteDesc =
  'By clicking on Agree button, all invites for this machine will be removed, please make sure before clicking on Agree button, if you do not want to remove all invites kindly click on disagree.';

const specificInviteHead = 'Are you sure you want to delete this INVITE ?';
const specificInviteDesc =
  'By clicking on Agree button, this invite will be removed, please make sure before clicking on Agree button, if you do not want to remove this invite kindly click on disagree.';

export default function DeleteDialog(props) {
  const { onCloseDelete, openDelete, delID } = props; // delID 1 for all, 2 for specific
  const { nominee, adminID, machineID } = props; // nominee 1 for admin, 2 for invite
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    onCloseDelete();
  };

  function onAgreeClick() {
    if (delID === 1 && nominee === 1) {
      dispatch(setMyComputerLoader(true));
      dispatch(removeAllAdmin(machineID));
    } else if (delID === 2 && nominee === 1) {
      const body = {
        id: adminID,
        machineId: machineID,
      };
      dispatch(setMyComputerLoader(true));
      dispatch(removeSpecificAdmin(body));
    } else if (delID === 1 && nominee === 2) {
      dispatch(setMyComputerLoader(true));
      dispatch(removeAllInvite(machineID));
    } else if (delID === 2 && nominee === 2) {
      dispatch(setMyComputerLoader(true));
      dispatch(removeSpecificInvite(adminID, machineID)); // admin id act as a invite id
    }
    handleClose();
  }

  return (
    <div>
      <Dialog
        // fullScreen={fullScreen}
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {delID === 1 && nominee === 1 && allAdminHead}
          {delID === 2 && nominee === 1 && specificAdminHead}

          {delID === 1 && nominee === 2 && allInviteHead}
          {delID === 2 && nominee === 2 && specificInviteHead}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {delID === 1 && nominee === 1 && allAdminDesc}
            {delID === 2 && nominee === 1 && specificAdminDesc}

            {delID === 1 && nominee === 2 && allInviteDesc}
            {delID === 2 && nominee === 2 && specificInviteDesc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={onAgreeClick} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
