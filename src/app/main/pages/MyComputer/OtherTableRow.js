import * as React from 'react';
// import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

function OtherTableRow(props) {
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
              pathname: '/pages/computer/1',
            });
          }
        }}
        key={key}
        sx={{ '& > *': { borderBottom: 'unset' } }}
      >
        <TableCell component="th" scope="row" align="justify">
          <div className="flex items-center">
            <Avatar className="mx-8" alt="" src={row.user.userImage} />
            <div className="flex flex-col">
              <Typography component="span" className="font-semibold flex">
                {`${row.user.firstName} ${row.user.lastName}`}
              </Typography>
              <Typography className="text-11 font-medium capitalize" color="textSecondary">
                {row.user.email}
              </Typography>
            </div>
          </div>
        </TableCell>
        <TableCell align="justify">
          <Tooltip title={row && row.status ? 'Online' : 'Offline'} placement="top">
            <div className="flex items-center">
              <Icon className="mx-8" color="default">
                laptop_chromebook
              </Icon>
              <div className="flex flex-col">
                <Typography component="span" className="font-semibold flex">
                  {`${row.machine.machineName}`}
                </Typography>
                <Typography className="text-11 font-medium capitalize" color="textSecondary">
                  {row.machine.createdOn}
                </Typography>
              </div>
            </div>
          </Tooltip>
        </TableCell>
        {/* <TableCell width={10} align="right">
          <IconButton disableRipple color="inherit" size="small">
            <Icon className="text-24 arrow-icon">delete</Icon>
          </IconButton>
        </TableCell> */}
      </StyledTableRow>
    </>
  );
}

export default OtherTableRow;
