import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStats } from 'app/auth/store/mineSlice';
import ProjectDashboardAppHeader from './ProjectDashboardAppHeader';
import ProjectDashboardAppSidebar from './ProjectDashboardAppSidebar';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import HomeTab from './tabs/HomeTab';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    minHeight: 160,
    height: 160,
    [theme.breakpoints.up('lg')]: {
      marginRight: 12,
      borderBottomRightRadius: 20,
    },
  },
  '& .FusePageSimple-toolbar': {
    minHeight: 56,
    height: 56,
    alignItems: 'flex-end',
  },
  '& .FusePageSimple-rightSidebar': {
    width: 288,
    border: 0,
    padding: '12px 0',
  },
  '& .FusePageSimple-content': {
    maxHeight: '100%',
    '& canvas': {
      maxHeight: '100%',
    },
  },
}));

function ProjectDashboardApp(props) {
  const dispatch = useDispatch();
  // const widgets = useSelector(selectWidgets);
  const loaders = useSelector(({ auth }) => auth.loaders);

  const pageLayout = useRef(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(getWidgets());
      dispatch(getStats());
    }

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  // if (_.isEmpty(widgets)) {
  //   return null;
  // }

  return (
    <Root
      header={<ProjectDashboardAppHeader pageLayout={pageLayout} />}
      content={
        loaders.commonLoader ? (
          <CircularProgress
            style={{ marginTop: '24%', marginLeft: '50%', width: 56, height: 56 }}
            color="secondary"
          />
        ) : (
          <div className="p-12 lg:ltr:pr-0 lg:rtl:pl-0">{tabValue === 0 && <HomeTab />}</div>
        )
      }
      rightSidebarContent={<ProjectDashboardAppSidebar />}
      ref={pageLayout}
    />
  );
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);
