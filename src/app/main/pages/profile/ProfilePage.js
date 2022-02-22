import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
// import Tab from '@mui/material/Tab';
// import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import QRCodeDialog from 'app/fuse-layouts/shared-components/QRCodeDialog';
import ResetPasswordDialog from 'app/fuse-layouts/shared-components/ResetPasswordDialog';
import { motion } from 'framer-motion';
import { useState } from 'react';
// import Box from '@mui/material/Box';
import { useHistory } from 'react-router-dom';
import StatusIcon from 'app/fuse-layouts/shared-components/StatusIcon';
import AboutTab from './tabs/AboutTab';
import UserDialog from './UserDialog';
// import PhotosVideosTab from './tabs/PhotosVideosTab';
// import TimelineTab from './tabs/TimelineTab';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-topBg': {
    background: 'url("assets/images/profile/back04.jpg")!important',
    backgroundSize: 'cover!important',
    backgroundPosition: 'center center!important',
  },

  '& .FusePageSimple-header': {
    background: 'none',
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down('lg')]: {
      height: 240,
      minHeight: 240,
    },
  },

  '& .FusePageSimple-wrapper': {
    background: 'transparent',
  },

  '& .FusePageSimple-content': {
    width: '100%',
    maxWidth: 1120,
    margin: 'auto',
  },

  '& .FusePageSimple-toolbar': {
    width: '100%',
    maxWidth: 1120,
    margin: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'auto',
    height: 'auto',
    aliginItesm: 'flex-start',
  },
}));

function ProfilePage() {
  const history = useHistory();
  const user = useSelector(({ auth }) => auth.user);
  const loaders = useSelector(({ auth }) => auth.loaders);

  const [selectedTab, setSelectedTab] = useState(1);
  const [open, setOpen] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

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

  const handleClickOpenUser = () => {
    setOpenUser(true);
  };

  const handleCloseUser = (value) => {
    setOpenUser(false);
  };

  const handleCloseReset = (value) => {
    setOpenReset(false);
  };

  return loaders.myProfileLoader ? (
    <CircularProgress
      style={{ marginTop: '18%', marginLeft: '50%', width: 56, height: 56 }}
      color="secondary"
    />
  ) : (
    <Root
      header={<></>}
      contentToolbar={
        <>
          <QRCodeDialog open={open} onClose={handleClose} />
          <UserDialog open={openUser} onClose={handleCloseUser} />
          <ResetPasswordDialog openReset={openReset} onCloseReset={handleCloseReset} />
          <div className="w-full px-24 pb-48 flex flex-col md:flex-row flex-1 items-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
              <div className="relative">
                <div className="absolute right-0 bottom-0 -m-4 z-10">
                  <StatusIcon status={user.tokenData.isVerified ? 'online' : 'do-not-disturb'} />
                </div>

                <Avatar
                  sx={{
                    borderWidth: 4,
                    borderStyle: 'solid',
                    borderColor: 'background.default',
                  }}
                  className="-mt-64  w-128 h-128"
                  src={user.userData.userImage}
                  onClick={handleClickOpenUser}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </motion.div>
            <div className="flex flex-col md:flex-row flex-1 items-center justify-between p-8">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
              >
                <Typography
                  className="md:px-16 text-24 md:text-32 font-semibold tracking-tight"
                  variant="h4"
                  color="inherit"
                  onClick={handleClickOpenUser}
                  style={{ cursor: 'pointer' }}
                >
                  {user.userData.firstName
                    ? `${user.userData.firstName} ${user.userData.lastName}`
                    : 'User'}
                </Typography>
                <Typography className="text-11 ml-24 font-medium capitalize" color="textSecondary">
                  {user.tokenData.isVerified ? `Verified Account` : 'Please verify your account'}
                </Typography>
              </motion.div>

              <div className="flex items-center justify-end -mx-4 mt-24 md:mt-0">
                <Button
                  onClick={handleClickOpenUser}
                  className="mx-8"
                  variant="contained"
                  color="success"
                  aria-label="Follow"
                  startIcon={<Icon className="hidden sm:flex">account_circle</Icon>}
                >
                  Edit Profile
                </Button>
                <Button
                  onClick={handleClickOpenReset}
                  className="mx-8"
                  variant="contained"
                  color="warning"
                  aria-label="Follow"
                  startIcon={<Icon className="hidden sm:flex">lock</Icon>}
                >
                  Reset Password
                </Button>
                <Button
                  onClick={handleClickOpen}
                  variant="contained"
                  color="primary"
                  aria-label="Send Message"
                  startIcon={<Icon className="hidden sm:flex">qr_code_scanner</Icon>}
                >
                  MFA QR Code
                </Button>
              </div>
            </div>
          </div>
        </>
      }
      content={<div className="p-16 sm:p-24">{selectedTab === 1 && <AboutTab />}</div>}
    />
  );
}

export default ProfilePage;
