import * as React from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Icon from '@mui/material/Icon';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import TablePaginationActions from 'app/fuse-layouts/shared-components/TablePaginationActions';
import { setInvitesLoader } from 'app/auth/store/loadersSlice';
import { getInvites } from 'app/auth/store/invitesSlice';
import { useDispatch, useSelector } from 'react-redux';
import InviteTableRow from './InviteTableRow';

function createData(id, name, date, email) {
  return {
    id,
    name,
    date,
    machines: [
      {
        date: '14/12/2021 15:40:29',
        machine: 'adnan-pc',
        owner: 'ahussain@dakarsoftware.com',
        status: true,
      },
      {
        date: '14/12/2021 15:40:29',
        machine: 'adnan-pc',
        owner: 'ahussain@dakarsoftware.com',
        status: false,
      },
    ],
    email,
  };
}

const rows = [
  createData('AX90P', 'Peter', '17/12/2021 12:40:29', 'peter@gmail.com'),
  createData('QW89Q', 'Stalin', '17/12/2021 12:40:29', 'peter@gmail.com'),
  createData('AS12F', 'Roger', '17/12/2021 12:40:29', 'peter@gmail.com'),
  createData('TR12S', 'Harry', '17/12/2021 12:40:29', 'peter@gmail.com'),
];

export default function InvitesTable(props) {
  const count = props.count ? props.count : false;
  const dispatch = useDispatch();

  const loaders = useSelector(({ auth }) => auth.loaders);
  const invitesData = useSelector(({ auth }) => auth.invites);
  const [getTabData, setTabData] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [getTotalRecords, setTotalRecords] = React.useState(0);
  const [page, setPage] = React.useState(0);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(setInvitesLoader(true));
      dispatch(getInvites(page));
    }

    return () => {
      mounted = false;
    };
  }, [dispatch, page]);

  React.useEffect(() => {
    if (invitesData.data && invitesData.data.totalRecords) {
      setTotalRecords(invitesData.data.totalRecords);
      const { records } = invitesData.data;
      let data = [];
      if (records && records.length > 0) {
        data = records.map((e, index) => {
          return {
            key: index,
            id: e.user.userId,
            isSuperUser: e.user.isSuperUser,
            firstName: e.user.firstName,
            lastName: e.user.lastName,
            displayName: e.user.friendlyName,
            email: e.user.email,
            userImage: e.user.userImage,
            domainName: e.user.domainName,
            domainID: e.user.domainId,
            invites: e.invities.map((f, indexI) => {
              let date = '';
              if (f.createdOn) {
                date = new Date(f.createdOn);
                date = date.toLocaleString();
              }
              return {
                key: indexI,
                userID: f.userId,
                userName: f.userName,
                userEmail: f.userEmail,
                userImage: f.userImage,
                machineID: f.machineId,
                machineName: f.machineName,
                isApproved: f.isApproved,
                isValid: f.isValid,
                title: f.title,
                createdOn: date,
              };
            }),
          };
        });
      }
      setTabData(data);
    }
  }, [invitesData, invitesData.data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return loaders.invitesLoader ? (
    <CircularProgress
      style={{ marginTop: '12%', marginLeft: '50%', width: 56, height: 56 }}
      color="secondary"
    />
  ) : (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead
          style={{
            backgroundColor: count ? 'rgb(17, 24, 39)' : 'rgb(17, 24, 39)',
          }}
        >
          <TableRow>
            {!count && <TableCell />}
            <TableCell style={{ color: count ? 'white' : 'white' }}>User</TableCell>
            <TableCell style={{ color: count ? 'white' : 'white' }} align="center">
              Email
            </TableCell>
            <TableCell style={{ color: count ? 'white' : 'white' }} align="justify">
              Super User?
            </TableCell>
            {/* <TableCell style={{ color: count ? 'white' : 'black' }} align="right">
              Add
            </TableCell>
            <TableCell width={10} />
            <TableCell width={10} />
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
                  <InviteTableRow key={row.key} row={row} count={count} totalRows={getTabData} />
                );
              })}
            </>
          ) : (
            <>
              <TableCell colSpan={8}>
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
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
}
