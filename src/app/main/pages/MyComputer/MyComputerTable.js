import * as React from 'react';
// import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import { setMyComputerLoader } from 'app/auth/store/loadersSlice';
import TablePaginationActions from 'app/fuse-layouts/shared-components/TablePaginationActions';
import { getMyComputers } from 'app/auth/store/mineSlice';
import { useDispatch, useSelector } from 'react-redux';
import MyCompTableRow from './MyCompTableRow';

export default function MyComputerTable(props) {
  const count = props.count ? props.count : false;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [getTotalRecords, setTotalRecords] = React.useState(0);
  const dispatch = useDispatch();
  const myCompData = useSelector(({ auth }) => auth.mine);
  const loaders = useSelector(({ auth }) => auth.loaders);

  const [getTabData, setTabData] = React.useState([]);
  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(setMyComputerLoader(true));
      dispatch(getMyComputers(page));
    }

    return () => {
      mounted = false;
    };
  }, [dispatch, page]);

  React.useEffect(() => {
    if (myCompData.data && myCompData.data.totalRecords) {
      setTotalRecords(myCompData.data.totalRecords);
      const { records } = myCompData.data;
      let data = [];
      if (records && records.length > 0) {
        data = records.map((e, index) => {
          let date = '';
          if (e.userMachine.dateCreated) {
            date = new Date(e.userMachine.dateCreated);
            date = date.toLocaleString();
          }
          return {
            key: index,
            id: e.userMachine.id,
            createdOn: date,
            name: e.userMachine.machineName,
            admins: e.userMachineAdmins.map((q, indexA) => {
              let dateAdmin = '';
              if (q.createdOn) {
                dateAdmin = new Date(q.createdOn);
                dateAdmin = date.toLocaleString();
              }
              return {
                key: indexA,
                createdOn: dateAdmin,
                id: q.userId,
                machineID: q.machineId,
                userEmail: q.userEmail,
                userName: q.userName,
                userImage: q.userImage,
                machineName: q.machineName,
                machineAdminID: q.id,
                grantFuther: q.grantFuther ? q.grantFuther : false,
              };
            }),
            invites: e.userMachineInvites.map((f, indexI) => {
              let dateInvite = '';
              if (f.createdOn) {
                dateInvite = new Date(f.createdOn);
                dateInvite = date.toLocaleString();
              }
              return {
                key: indexI,
                id: f.userId,
                inviteId: f.id,
                userName: f.userName,
                userEmail: f.userEmail,
                userImage: f.userImage,
                machineID: f.machineId,
                machineName: f.machineName,
                title: f.title,
                createdOn: dateInvite,
                canController: f.canController,
                dateFrom: f.dateFrom,
                dateTo: f.dateTo,
                description: f.description,
                needPassword: f.needPassword,
                timeToLive: f.timeToLive,
                isApproved: f.isApproved,
                isValid: f.isValid,
              };
            }),
          };
        });
      }
      setTabData(data);
    }
  }, [myCompData, myCompData.data]);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  // function handleChangeRowsPerPage(event) {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // }

  return loaders.myComputerLoader ? (
    <CircularProgress
      style={{ marginTop: '12%', marginLeft: '50%', width: 56, height: 56 }}
      color="secondary"
    />
  ) : (
    <div>
      {/* <div className="pb-16">
        <Button variant="contained" color="secondary" className="w-auto">
          Add Computer
        </Button>

        <Button variant="contained" color="secondary" className="w-auto ml-16">
          Add Invite
        </Button>
      </div> */}

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead
            style={{
              backgroundColor: count ? 'rgb(17, 24, 39)' : 'rgb(17, 24, 39)',
              color: count ? 'white' : 'white',
            }}
          >
            <TableRow>
              {!count && <TableCell width={100} />}
              <TableCell style={{ color: count ? 'white' : 'white' }}>Machine Name</TableCell>
              {!count && (
                <>
                  <TableCell style={{ color: count ? 'white' : 'white' }} align="justify">
                    Date Created
                  </TableCell>
                </>
              )}
              {/* <TableCell style={{ color: count ? 'white' : 'black' }} align="right">
                Add User
              </TableCell> */}
              <TableCell align="justify" />
              {/* <TableCell width={10} />
              <TableCell width={10} /> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {getTabData && getTabData.length > 0 ? (
              <>
                {getTabData.map((row, index) => {
                  if (count && index > 4) {
                    return null;
                  }
                  return (
                    <MyCompTableRow key={row.key} row={row} count={count} totalRows={getTabData} />
                  );
                })}
              </>
            ) : (
              <>
                <TableCell colSpan={4}>
                  <div className="flex justify-center">
                    <div className="flex items-center">
                      {/* <Icon color="inherit">mood_bad</Icon> */}
                      <Typography
                        className="text-16 ml-24 mt-14 mb-14 font-medium capitalize"
                        color="textSecondary"
                      >
                        No Records Found
                      </Typography>
                    </div>
                  </div>
                </TableCell>
              </>
            )}
          </TableBody>
          {!count && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={false}
                  colSpan={7}
                  count={getTotalRecords}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  // onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}
