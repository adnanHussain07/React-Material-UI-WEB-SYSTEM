import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { logoutUser } from 'app/auth/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import QRCodeDialog from './QRCodeDialog';
import ResetPasswordDialog from './ResetPasswordDialog';

function UserMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const loginData = useSelector(({ auth }) => auth.login);
  const history = useHistory();

  const [userMenu, setUserMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [openReset, setOpenReset] = useState(false);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenReset = () => {
    // userMenuClose();
    setOpenReset(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const handleCloseReset = (value) => {
    setOpenReset(false);
  };

  const logOutCurr = () => {
    dispatch(logoutUser('logout'));
  };

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {user.userData.firendlyName ? user.userData.firendlyName : user.data.displayName}
          </Typography>
          <Typography className="text-11 font-medium capitalize" color="textSecondary">
            {user.tokenData.isVerified ? 'Verified' : 'Not Verified'}
            {/* {user.role.toString()}
            {(!user.role || (Array.isArray(user.role) && user.role.length === 0)) && 'Guest'} */}
          </Typography>
        </div>

        <div className="relative">
          <div className="absolute left-0 bottom-0 -m-4 z-10">
            {user.tokenData.isVerified ? (
              <Icon className="block text-16 text-green bg-white rounded-full">check_circle</Icon>
            ) : (
              <Icon className="block text-16 text-red bg-white rounded-full">
                remove_circle_outline
              </Icon>
            )}
          </div>

          {user.userData.userImage ? (
            <Avatar className="md:mx-4" alt="user photo" src={user.userData.userImage} />
          ) : (
            <Avatar className="md:mx-4">
              {user.userData.firstName
                ? user.userData.firstName[0].toUpperCase()
                : user.data.displayName[0].toUpperCase()}
            </Avatar>
          )}
        </div>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{
          paper: 'py-8',
        }}
      >
        <QRCodeDialog open={open} onClose={handleClose} />
        <ResetPasswordDialog openReset={openReset} onCloseReset={handleCloseReset} />
        <MenuItem component={Link} to="/pages/profile" onClick={userMenuClose} role="button">
          <ListItemIcon className="min-w-40">
            <Icon>account_circle</Icon>
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItem>
        <MenuItem
          // component={Link}
          // to="/pages/auth/reset-password"
          onClick={handleClickOpenReset}
          role="button"
        >
          <ListItemIcon className="min-w-40">
            <Icon>lock</Icon>
          </ListItemIcon>
          <ListItemText primary="Reset Password" />
        </MenuItem>
        {/* <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose} role="button">
          <ListItemIcon className="min-w-40">
            <Icon>mail</Icon>
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </MenuItem> */}
        <MenuItem onClick={handleClickOpen} role="button">
          <ListItemIcon className="min-w-40">
            <Icon>qr_code_scanner</Icon>
          </ListItemIcon>
          <ListItemText primary="2 Factor-Auth" />
        </MenuItem>
        <MenuItem onClick={logOutCurr} role="button">
          {/* <MenuItem component={Link} to="/logout"> */}
          <ListItemIcon className="min-w-40">
            <Icon>exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Popover>
    </>
  );
}

export default UserMenu;
