import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import { motion } from 'framer-motion';
import withReducer from 'app/store/withReducer';
import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationModel from 'app/fuse-layouts/shared-components/notificationPanel/model/NotificationModel';
import { addNotification } from 'app/fuse-layouts/shared-components/notificationPanel/store/dataSlice';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { toggleQuickPanel } from './store/stateSlice';
import { getData } from './store/dataSlice';
import reducer from './store';

function QuickPanel(props) {
  const dispatch = useDispatch();
  const data = useSelector(({ quickPanel }) => quickPanel.data);
  const state = useSelector(({ quickPanel }) => quickPanel.state);

  const [checked, setChecked] = useState('notifications');
  const [showIcons, setShowIcons] = useState(true);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
      width: showIcons ? 120 : 420,
    },
  }));
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const StyledListItem = styled(ListItem)(({ theme, completed }) => ({
    ...(completed && {
      background: 'rgba(0,0,0,0.03)',
      '& .todo-title, & .todo-notes': {
        textDecoration: 'line-through',
      },
    }),
  }));

  function createNotification(obj) {
    dispatch(addNotification(NotificationModel(obj)));
  }

  function comingSoonNotify() {
    createNotification({
      message: 'Coming Soon ...',
      options: { variant: 'info' },
    });
  }

  return (
    <StyledSwipeableDrawer
      open={state}
      anchor="right"
      onOpen={(ev) => { }}
      onClose={(ev) => {
        setShowIcons(true);
        dispatch(toggleQuickPanel());
      }}
      disableSwipeToOpen
    >
      {!showIcons ? (
        <FuseScrollbars>
          <ListSubheader style={{ backgroundColor: '#252f3e' }} component="div">
            <AppBar position="static" className="shadow-md -ml-14">
              <Toolbar className="px-4">
                <div className="flex flex-1 items-center px-4">
                  <div className="flex px-4">
                    <IconButton
                      onClick={() => {
                        setShowIcons(true);
                        dispatch(toggleQuickPanel());
                      }}
                      color="inherit"
                      size="large"
                    >
                      <Icon>close</Icon>
                    </IconButton>
                  </div>

                  <Typography className="mx-8 text-16" color="inherit">
                    <div className="flex items-center">
                      <span className="ml-8 mt-2">Downloads</span>
                    </div>
                  </Typography>
                </div>
              </Toolbar>
            </AppBar>
          </ListSubheader>

          <motion.div variants={item}>
            <div className="MuiButtonBase-root MuiListItem-root MuiListItem-dense MuiListItem-gutters MuiListItem-padding MuiListItem-button py-20 px-0 ml-16 sm:px-8 muiltr-1ycde0a-MuiButtonBase-root-MuiListItem-root">
              <div className="flex flex-1 flex-col relative overflow-hidden px-8">
                <Typography variant="h6"> SheepShareSetup.msi </Typography>
                <p className="MuiTypography-root MuiTypography-body1 todo-notes truncate muiltr-1b1qer1-MuiTypography-root mt-16">
                  Download as Microsoft installer (MSI) (Recommended)
                  <br />
                  All depending libraries etc are included in the file.
                </p>
              </div>
              <div className="mt-16">
                {/* onClick={()=>{clickToDownload("https://app.sheepshareremote.com/attachments/setup/SheepShareSetup.msi")}} */}
                <Button variant="outlined" startIcon={<DownloadIcon />}>
                  <Link
                    href="https://app.sheepshareremote.com/attachments/setup/SheepShareSetup.msi"
                    underline="none"
                    target="_blank"
                    style={{ background: 'unset' }}
                  >
                    Click to Download
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
          <Divider />
          <motion.div variants={item}>
            <div className="MuiButtonBase-root MuiListItem-root MuiListItem-dense MuiListItem-gutters MuiListItem-padding MuiListItem-button py-20 px-0 ml-24 sm:px-8 muiltr-1ycde0a-MuiButtonBase-root-MuiListItem-root">
              <div className="flex flex-1 flex-col relative overflow-hidden px-8">
                <Typography variant="h6"> SheepShareSetup.exe </Typography>
                <p className="MuiTypography-root MuiTypography-body1 todo-notes truncate muiltr-1b1qer1-MuiTypography-root mt-16">
                  Download as executable.
                  <br />
                  You will be prompted to download and install any additional C++ runtime lib etc.
                </p>
              </div>
              <div className="mt-16">
                {/* <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => {
                    clickToDownload(
                      "https://app.sheepshareremote.com/attachments/setup/SheepShareSetup.exe"
                    );
                  }}
                >
                  Click to Download
                </Button> */}
                <Button variant="outlined" startIcon={<DownloadIcon />}>
                  <Link
                    href="https://app.sheepshareremote.com/attachments/setup/SheepShareSetup.exe"
                    underline="none"
                    target="_blank"
                    style={{ background: 'unset' }}
                  >
                    Click to Download
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
          <Divider />
          <motion.div variants={item}>
            <div className="MuiButtonBase-root MuiListItem-root MuiListItem-dense MuiListItem-gutters MuiListItem-padding MuiListItem-button py-20 px-0 ml-24 sm:px-8 muiltr-1ycde0a-MuiButtonBase-root-MuiListItem-root">
              <div className="flex flex-1 flex-col relative overflow-hidden px-8">
                <Typography variant="h6"> SheepShare.exe </Typography>
                <p className="MuiTypography-root MuiTypography-body1 todo-notes truncate muiltr-1b1qer1-MuiTypography-root mt-16">
                  Download as Microsoft installer (MSI) (Recommended)
                  <br />
                  All depending libraries etc are included in the file.
                </p>
              </div>
              <div className="mt-16">
                {/* <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => {
                    clickToDownload(
                      "https://app.sheepshareremote.com/attachments/setup/SheepShare.exe"
                    );
                  }}
                >
                  Click to Download
                </Button> */}
                <Button variant="outlined" startIcon={<DownloadIcon />}>
                  <Link
                    href="https://app.sheepshareremote.com/attachments/setup/SheepShare.exe"
                    underline="none"
                    target="_blank"
                    style={{ background: 'unset' }}
                  >
                    Click to Download
                  </Link>{' '}
                </Button>
              </div>
            </div>
          </motion.div>
          <Divider />
          <ListSubheader component="div">Application Tools</ListSubheader>
          <motion.div variants={item}>
            <div className="MuiButtonBase-root MuiListItem-root MuiListItem-dense MuiListItem-gutters MuiListItem-padding MuiListItem-button py-20 px-0 ml-24 -mt-8 sm:px-8 muiltr-1ycde0a-MuiButtonBase-root-MuiListItem-root">
              <div className="flex flex-1 flex-col relative overflow-hidden px-8">
                <Typography variant="h6"> VC_redist.x64.exe </Typography>
                <p className="MuiTypography-root MuiTypography-body1 todo-notes truncate muiltr-1b1qer1-MuiTypography-root mt-16">
                  Download as Microsoft installer (MSI) (Recommended)
                  <br />
                  All depending libraries etc are included in the file.
                </p>
              </div>
              <div className="mt-16">
                {/* <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => {
                    clickToDownload(
                      "https://app.sheepshareremote.com/attachments/setup/vcredist_x64.exe"
                    );
                  }}
                >
                  Click to Download
                </Button> */}
                <Button variant="outlined" startIcon={<DownloadIcon />}>
                  <Link
                    href="https://app.sheepshareremote.com/attachments/setup/vcredist_x64.exe"
                    underline="none"
                    target="_blank"
                    style={{ background: 'unset' }}
                  >
                    Click to Download
                  </Link>{' '}
                </Button>
              </div>
            </div>
          </motion.div>
          <Divider />
          {/* <ListSubheader component="div">Documentation</ListSubheader>
          <motion.div variants={item}>
            <div className="MuiButtonBase-root MuiListItem-root MuiListItem-dense MuiListItem-gutters MuiListItem-padding MuiListItem-button py-20 px-0 ml-24 -mt-8 sm:px-8 muiltr-1ycde0a-MuiButtonBase-root-MuiListItem-root">
              <div className="flex flex-1 flex-col relative overflow-hidden px-8">
                <Typography variant="h6"> SheepShare Technical Doc.docx </Typography>
                <p className="MuiTypography-root MuiTypography-body1 todo-notes truncate muiltr-1b1qer1-MuiTypography-root mt-16">
                  Download as Microsoft installer (MSI) (Recommended)
                  <br />
                  All depending libraries etc are included in the file.
                </p>
              </div>
              <div className="mt-16">
                <Button variant="outlined" startIcon={<DownloadIcon />}>
                  <Link
                    href="https://app.sheepshareremote.com/attachments/setup/SheepShare%20Technical%20Documentation.docx"
                    underline="none"
                    target="_blank"
                    style={{ background: 'unset' }}
                  >
                    Click to Download
                  </Link>{' '}
                </Button>
              </div>
            </div>
          </motion.div> */}
        </FuseScrollbars>
      ) : (
        <div className="w-full px-0 pb-48 flex flex-col md:flex-row flex-1 items-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, transition: { delay: 0.1 } }}>
            {/* <ListSubheader component="div">
              <IconButton
                onClick={() => {
                  setShowIcons(true);
                  dispatch(toggleQuickPanel());
                }}
              >
                <Icon style={{ transform: 'rotate(180deg)' }}>menu_open</Icon>
              </IconButton>
            </ListSubheader> */}
            <div
              className="flex items-center"
              style={{ justifyContent: 'space-around', marginLeft: '10px', cursor: 'pointer' }}
            >
              {/* <IconButton
                
              >
                <Icon style={{ transform: "rotate(180deg)" }}>cancel</Icon>
              </IconButton>
              <span className="ml-8 mt-2">Close</span> */}
              <Button
                variant="contained"
                startIcon={<Icon style={{ transform: 'rotate(180deg)' }}>cancel</Icon>}
                onClick={() => {
                  setShowIcons(true);
                  dispatch(toggleQuickPanel());
                }}
                // color="error"
              >
                Close
              </Button>
            </div>

            <Avatar
              sx={{
                borderWidth: 4,
                borderStyle: 'solid',
                borderColor: 'background.default',
              }}
              className="mt-48  w-96 h-96"
              src="assets/images/logos/windows-logo.svg"
              onClick={() => setShowIcons(false)}
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            />

            <Avatar
              sx={{
                borderWidth: 4,
                borderStyle: 'solid',
                borderColor: 'background.default',
              }}
              className="mt-48  w-96 h-96"
              src="assets/images/logos/linux-logo.svg"
              onClick={() => comingSoonNotify()}
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            />

            <Avatar
              sx={{
                borderWidth: 4,
                borderStyle: 'solid',
                borderColor: 'background.default',
              }}
              className="mt-48  w-96 h-96"
              src="assets/images/logos/mac-logo.svg"
              onClick={() => comingSoonNotify()}
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            />

            <Avatar
              sx={{
                borderWidth: 4,
                borderStyle: 'solid',
                borderColor: 'background.default',
              }}
              className="mt-48  w-96 h-96"
              src="assets/images/logos/android-logo.svg"
              onClick={() => comingSoonNotify()}
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            />
          </motion.div>
        </div>
      )}
    </StyledSwipeableDrawer>
  );
}

export default withReducer('quickPanel', reducer)(memo(QuickPanel));
