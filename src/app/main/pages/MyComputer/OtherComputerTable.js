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
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import TablePaginationActions from 'app/fuse-layouts/shared-components/TablePaginationActions';
import CircularProgress from '@mui/material/CircularProgress';
import { setOtherComputerLoader } from 'app/auth/store/loadersSlice';
import { getOtherComputers } from 'app/auth/store/otherSlice';
import { useDispatch, useSelector } from 'react-redux';
import OtherTableRow from './OtherTableRow';

export default function OtherComputerTable(props) {
  const count = props.count ? props.count : false;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [getTotalRecords, setTotalRecords] = React.useState(0);
  const [getTabData, setTabData] = React.useState([]);
  const dispatch = useDispatch();

  const loaders = useSelector(({ auth }) => auth.loaders);
  const otherData = useSelector(({ auth }) => auth.other);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(setOtherComputerLoader(true));
      dispatch(getOtherComputers(page));
    }

    return () => {
      mounted = false;
    };
  }, [dispatch, page]);

  React.useEffect(() => {
    if (otherData.data && otherData.data.totalRecords) {
      setTotalRecords(otherData.data.totalRecords);
      const { records } = otherData.data;
      let data = [];
      if (records && records.length > 0) {
        data = records.map((w, index) => {
          let date = '';
          if (w.machine.dateCreated) {
            date = new Date(w.machine.dateCreated);
            date = date.toLocaleString();
          }
          return {
            key: index,
            id: index + 1,
            machine: {
              key: index + 2,
              id: w.machine.id,
              machineName: w.machine.machineName,
              createdOn: date,
            },
            user: {
              key: index + 3,
              email: w.user.email,
              firstName: w.user.firstName,
              lastName: w.user.lastName,
              displayName: w.user.friendlyName,
              userImage: w.user.userImage,
              userID: w.user.userId,
              isSuperUser: w.user.isSuperUser,
              domainID: w.user.domainId,
              domainName: w.user.domainName,
            },
          };
        });
      }
      setTabData(data);
    }
  }, [otherData, otherData.data]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return loaders.otherComputerLoader ? (
    <CircularProgress
      style={{ marginTop: '12%', marginLeft: '50%', width: 56, height: 56 }}
      color="secondary"
    />
  ) : (
    <div>
      {/* <div className="pb-16">
        <Button variant="contained" color="secondary" className="w-auto">
          Add Invite
        </Button>
      </div> */}

      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead
            style={{
              backgroundColor: count ? 'rgb(17, 24, 39)' : 'rgb(228 228 228)',
              color: count ? 'white' : 'black',
            }}
          >
            <TableRow>
              <TableCell style={{ color: count ? 'white' : 'black' }} align="justify">
                User
              </TableCell>
              <TableCell style={{ color: count ? 'white' : 'black' }} align="justify">
                Machine
              </TableCell>
              {/* <TableCell width={10} /> */}
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
                    <OtherTableRow key={row.key} row={row} count={count} totalRows={getTabData} />
                  );
                })}
              </>
            ) : (
              <>
                <TableCell colSpan={3}>
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
                  colSpan={2}
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
    </div>
  );
}
