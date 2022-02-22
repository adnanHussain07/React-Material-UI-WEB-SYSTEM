import AppBar from '@mui/material/AppBar';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
// import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openNewContactDialog } from '../store/contactsSlice';
import UserDialog from '../UserDialog';

function AboutTab() {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const test = (x) => x + 1;
  const history = useHistory();
  const loginData = useSelector(({ auth }) => auth.login);
  const user = useSelector(({ auth }) => auth.user);

  const container = {
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <UserDialog open={open} onClose={handleClose} />
      <div className="md:flex max-w-2xl -mt-48">
        <div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  User Information
                </Typography>
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={handleClickOpen}
                  size="large"
                >
                  <Icon className="text-24" color="inherit">
                    create
                  </Icon>
                </IconButton>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">User Email</Typography>
                <Typography>
                  {user.userData.identifier ? user.userData.identifier : 'example@example.com'}
                </Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Display Name</Typography>
                <Typography>
                  {user.userData.firendlyName ? user.userData.firendlyName : ''}
                </Typography>

                {/* {general.locations.map((location) => (
                  <div className="flex items-center" key={location}>
                    <Typography>{location}</Typography>
                    <Icon className="text-16 mx-4" color="action">
                      location_on
                    </Icon>
                  </div>
                ))} */}
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">First Name</Typography>
                <Typography>{user.userData.firstName ? user.userData.firstName : ''}</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Last Name</Typography>
                <Typography>{user.userData.lastName ? user.userData.lastName : ''}</Typography>
              </div>
            </CardContent>
          </Card>

          {/* <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  General Information
                </Typography>
              </Toolbar>
            </AppBar>

            <CardContent>
              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Friendly Name</Typography>
                <Typography>Adnan</Typography>
              </div>

              <div className="mb-24">
                <Typography className="font-semibold mb-4 text-15">Gender</Typography>
                <Typography>Male</Typography>
              </div>
            </CardContent>
          </Card> */}
        </div>

        <div className="flex flex-col md:w-320">
          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  My Machines
                </Typography>
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => {
                    history.push({
                      pathname: '/pages/computer',
                    });
                  }}
                  size="large"
                >
                  <Icon className="text-24" color="inherit">
                    create
                  </Icon>
                </IconButton>
                {/* <Button color="inherit" size="small">
                  See 454 more
                </Button> */}
              </Toolbar>
            </AppBar>
            <CardContent className="flex flex-wrap w-full justify-center py-16 px-8">
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => {
                  history.push({
                    pathname: '/pages/computer',
                  });
                }}
                // onClick={() => dispatch(hideMessage())}
                size="large"
              >
                <Icon className="text-96" color="inherit">
                  laptop_mac
                </Icon>
              </IconButton>
              {/* {friends.map((friend) => (
                <img
                  key={friend.id}
                  className="w-64 m-4 rounded-16 block"
                  src={friend.avatar}
                  alt={friend.name}
                />
              ))} */}
            </CardContent>
          </Card>

          <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                 My Invitations
                </Typography>
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => {
                    history.push({
                      pathname: '/pages/invites',
                    });
                  }}
                  size="large"
                >
                  <Icon className="text-24" color="inherit">
                    create
                  </Icon>
                </IconButton>
                {/* <Button color="inherit" size="small">
                  See 454 more
                </Button> */}
              </Toolbar>
            </AppBar>
            <CardContent className="flex flex-wrap w-full justify-center py-16 px-8">
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => {
                  history.push({
                    pathname: '/pages/invites',
                  });
                }}
                size="large"
              >
                <Icon className="text-96" color="inherit">
                speaker_notes
                </Icon>
              </IconButton>
              {/* {friends.map((friend) => (
                <img
                  key={friend.id}
                  className="w-64 m-4 rounded-16 block"
                  src={friend.avatar}
                  alt={friend.name}
                />
              ))} */}
            </CardContent>
          </Card>

          {/* <Card component={motion.div} variants={item} className="w-full mb-32 rounded-16 shadow">
            <AppBar position="static" elevation={0}>
              <Toolbar className="px-8">
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  className="flex-1 px-12 font-medium"
                >
                  Joined Groups
                </Typography>
                <Button color="inherit" size="small">
                  See 6 more
                </Button>
              </Toolbar>
            </AppBar>
            <CardContent className="p-0">
              <List className="p-0">
                {groups.map((group) => (
                  <ListItem key={group.id} className="px-8">
                    <Avatar className="mx-8" alt={group.name}>
                      {group.name[0]}
                    </Avatar>
                    <ListItemText
                      primary={
                        <div className="flex">
                          <Typography className="font-medium" color="secondary" paragraph={false}>
                            {group.name}
                          </Typography>

                          <Typography className="mx-4 font-normal" paragraph={false}>
                            {group.category}
                          </Typography>
                        </div>
                      }
                      secondary={group.members}
                    />
                    <ListItemSecondaryAction>
                      <IconButton size="large">
                        <Icon>more_vert</Icon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </motion.div>
  );
}

export default AboutTab;
