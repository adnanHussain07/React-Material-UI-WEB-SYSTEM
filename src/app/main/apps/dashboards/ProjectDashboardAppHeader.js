import Avatar from '@mui/material/Avatar';
import { lighten } from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import history from '@history';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { getProjects } from './store/projectsSlice';

function ProjectDashboardAppHeader(props) {
  const { pageLayout } = props;

  const dispatch = useDispatch();
  // const widgets = useSelector(selectWidgets);
  // const projects = useSelector(selectProjects);
  const user = useSelector(({ auth }) => auth.user);
  const loginData = useSelector(({ auth }) => auth.login);

  const [selectedProject, setSelectedProject] = useState({
    id: 1,
    menuEl: null,
  });

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  function handleChangeProject(id) {
    setSelectedProject({
      id,
      menuEl: null,
    });
  }

  function handleOpenProjectMenu(event) {
    setSelectedProject({
      id: selectedProject.id,
      menuEl: event.currentTarget,
    });
  }

  function handleCloseProjectMenu() {
    setSelectedProject({
      id: selectedProject.id,
      menuEl: null,
    });
  }

  // if (_.isEmpty(projects)) {
  //   return null;
  // }

  return (
    <div className="flex flex-col justify-between flex-1 min-w-0 px-24 pt-24">
      <div className="flex justify-between items-center">
        <div className="flex items-center min-w-0">
          <div className="relative">
            <div className="absolute -right-6 bottom-0 -m-4 z-10">
              {user.tokenData.isVerified ? (
                <Icon fontSize="medium" className="block text-24 text-green bg-white rounded-full">
                  check_circle
                </Icon>
              ) : (
                <Icon fontSize="medium" className="block text-24 text-red bg-white rounded-full">
                  remove_circle_outline
                </Icon>
              )}
            </div>

            <Avatar
              className="w-52 h-52 sm:w-64 sm:h-64"
              alt="user photo"
              src={user.userData.userImage}
            />
          </div>

          <div className="mx-12 min-w-0">
            <Typography className="text-18 sm:text-24 md:text-32 font-bold leading-none mb-8 tracking-tight">
              {user.userData.firstName ? (
                <>Welcome back, {`${user.userData.firstName} ${user.userData.lastName}`}!</>
              ) : (
                <>Welcome back !</>
              )}
            </Typography>

            <div className="flex items-center ml-16 opacity-60 truncate">
              <Icon className="text-8 sm:text-16" variant="contained" color="error">
                {user.tokenData.isVerified ? '' : 'report'}
              </Icon>
              <Typography className="text-12 ml-8 sm:text-14 font-medium mx-4 truncate">
                {user.tokenData.isVerified
                  ? ''
                  : 'Kindly check your provided account for verification email.'}
              </Typography>
            </div>
          </div>
        </div>
        <Hidden lgUp>
          <IconButton
            onClick={(ev) => pageLayout.current.toggleRightSidebar()}
            aria-label="open left sidebar"
            color="inherit"
            size="large"
          >
            <Icon>menu</Icon>
          </IconButton>
        </Hidden>
      </div>
      <div className="flex items-end">
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => history.push({ pathname: '/pages/schedules' })}
          // onKeyDown={}
          className="flex items-center"
        >
          <Box
            className={clsx('flex items-center h-40 px-16 text-13 sm:text-16')}
            sx={{
              background: (theme) => lighten(theme.palette.primary.dark, 0.1),
              color: (theme) => theme.palette.primary.contrastText,
              borderRadius: '16px 0 0 0',
            }}
          >
            Employees Schedule
          </Box>
          {/* <Menu
            id="project-menu"
            anchorEl={selectedProject.menuEl}
            open={Boolean(selectedProject.menuEl)}
            onClose={handleCloseProjectMenu}
          >
            {projects &&
              projects.map((project) => (
                <MenuItem
                  key={project.id}
                  onClick={(ev) => {
                    handleChangeProject(project.id);
                  }}
                >
                  {project.name}
                </MenuItem>
              ))}
          </Menu> */}
        </div>
      </div>
    </div>
  );
}

export default ProjectDashboardAppHeader;
