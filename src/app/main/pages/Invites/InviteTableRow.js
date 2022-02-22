import * as React from 'react';
// import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useHistory } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

function InviteTableRow(props) {
  const { row, key, totalRows } = props;
  const count = props.count ? props.count : false;
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: !count ? theme.palette.action.activatedOpacity : theme.palette.action.hover,
      cursor: count ? 'pointer' : '',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <>
      <StyledTableRow
        onClick={() => {
          if (count) {
            history.push({
              pathname: '/pages/invites',
            });
          }
        }}
        sx={{ '& > *': { borderBottom: 'unset' } }}
      >
        {!count && (
          <TableCell>
            <IconButton
              color="primary"
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        <TableCell component="th" scope="row">
          <div className="flex items-center">
            <Avatar className="mx-8" alt="" src={row.userImage} />
            <span className="ml-8">{`${row.firstName} ${row.lastName}`}</span>
          </div>
        </TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="justify">
          {row.isSuperUser ? (
            <IconButton aria-label="expand row" size="small">
              <Icon>check_circle</Icon>
            </IconButton>
          ) : (
            <IconButton aria-label="expand row" size="small">
              <Icon>cancel</Icon>
            </IconButton>
          )}
        </TableCell>
        {/* <TableCell align="right">
          <IconButton disableRipple color="inherit" size="small">
            <Icon className="text-24 arrow-icon">speaker_notes</Icon>
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton disableRipple color="inherit" size="small">
            <Icon className="text-24 arrow-icon">plagiarism</Icon>
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton disableRipple color="inherit" size="small">
            <Icon className="text-24 arrow-icon">create</Icon>
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton disableRipple color="inherit" size="small">
            <Icon className="text-24 arrow-icon">delete</Icon>
          </IconButton>
        </TableCell> */}
      </StyledTableRow>
      <TableRow style={{ backgroundColor: `${open ? 'rgb(234 237 239 / 50%)' : ''}` }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="caption" gutterBottom component="div">
                <strong>INVITES</strong>
              </Typography>
              <Table style={{ backgroundColor: '#f2f2f2' }} size="small" aria-label="purchases">
                <TableHead style={{ backgroundColor: 'rgb(219 225 236)' }}>
                  <TableRow>
                    <TableCell align="justify">Name</TableCell>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Date</TableCell>
                    {/* <TableCell align="right">Add</TableCell>
                    <TableCell width={10} />
                    <TableCell width={10} /> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.invites.length > 0 ? (
                    <>
                      {row.invites.map((usersRow) => (
                        <TableRow key={usersRow.key}>
                          <TableCell align="center">
                            <div className="flex items-center">
                              <Icon color="default">laptop_chromebook</Icon>
                              <span className="ml-12">{usersRow.machineName}</span>
                            </div>
                          </TableCell>
                          <TableCell align="center">{usersRow.title}</TableCell>
                          <TableCell align="center">{usersRow.createdOn}</TableCell>
                          {/* <TableCell align="right">
                            <IconButton disableRipple color="inherit" size="small">
                              <Icon className="text-24 arrow-icon">laptop_mac</Icon>
                            </IconButton>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton disableRipple color="inherit" size="small">
                              <Icon className="text-24 arrow-icon">create</Icon>
                            </IconButton>
                          </TableCell>
                          <TableCell align="right">
                            <IconButton disableRipple color="inherit" size="small">
                              <Icon className="text-24 arrow-icon">delete</Icon>
                            </IconButton>
                          </TableCell> */}
                        </TableRow>
                      ))}
                    </>
                  ) : (
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
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default InviteTableRow;
