import * as React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditMyCompDialog from 'app/fuse-layouts/shared-components/EditMyCompDialog';
import DeleteDialog from 'app/fuse-layouts/shared-components/DeleteDialog';
import AddEditDialog from 'app/fuse-layouts/shared-components/AddEditDialog';
import Icon from '@mui/material/Icon';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { useHistory } from 'react-router-dom';
import { openNewInviteDialog, openEditInviteDialog } from 'app/auth/store/invitesSlice';
import MyComputerInvitation from './MyComputerInvitation';

function MyCompTableRow(props) {
  const { row, key, totalRows } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const count = props.count ? props.count : false;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAddEdit, setOpenAddEdit] = React.useState(false);
  const [getID, setID] = React.useState(0);
  const [getDel, setDel] = React.useState(0); // 1 for del all, 2 for del specific
  const [getNominee, setNominee] = React.useState(0); // 1 for admin, 2 for invite
  const [getMachineID, setMachineID] = React.useState(0);
  const [getAdminID, setAdminID] = React.useState(0);
  const [getAdminData, setAdminData] = React.useState({});

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  let isEdit = false;

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

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenEdit = (id) => {
    // userMenuClose();
    setID(id);
    setOpenEdit(true);
    isEdit = true;
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenDelete = (delID, nomineeID, machineID, adminID) => {
    setMachineID(machineID);
    setAdminID(adminID);
    setDel(delID);
    setNominee(nomineeID);
    setOpenDelete(true);
  };

  const handleCloseAddEdit = () => {
    setOpenAddEdit(false);
  };

  function handleClickOpenAddEdit(machineID, adminID, adminDaata) {
    // userMenuClose();
    if (adminID) {
      setAdminData(adminDaata);
    } else {
      setAdminData({});
    }
    setMachineID(machineID);
    setAdminID(adminID);
    setOpenAddEdit(true);
  }

  return (
    <>
      <MyComputerInvitation />
      <EditMyCompDialog openEdit={openEdit} onCloseEdit={handleCloseEdit} id={getID} />
      <AddEditDialog
        openAddEdit={openAddEdit}
        onCloseAddEdit={handleCloseAddEdit}
        adminID={getAdminID}
        machineID={getMachineID}
        adminData={getAdminData}
      />
      <DeleteDialog
        openDelete={openDelete}
        onCloseDelete={handleCloseDelete}
        delID={getDel}
        nominee={getNominee}
        adminID={getAdminID}
        machineID={getMachineID}
      />
      <StyledTableRow
        onClick={() => {
          if (count && !isEdit) {
            history.push({
              pathname: '/pages/computer',
            });
          }
          isEdit = false;
        }}
        sx={{ '& > *': { borderBottom: 'unset' } }}
      >
        {!count && (
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        <TableCell component="th" scope="row">
          <Tooltip title={row && row.status ? 'Online' : 'Offline'} placement="top">
            <div className="flex items-center">
              <Icon color={row && row.status ? 'success' : 'default'}>laptop_chromebook</Icon>
              <span className="ml-12">{row.name}</span>
            </div>
          </Tooltip>
        </TableCell>
        {!count && (
          <>
            <TableCell align="justify">{row.createdOn}</TableCell>
          </>
        )}
        {/* <TableCell align="right">
          <IconButton disableRipple color="inherit" size="small">
            <Icon
              className="text-24 arrow-icon"
              onClick={(ev) => {
                ev.stopPropagation();
                dispatch(openNewInviteDialog(row));
              }}
              // onClick={dispatch(openNewInviteDialog(row.id))}
            >
              {' '}
              add_circle_outline
            </Icon>
          </IconButton>
        </TableCell> */}
        {/* <TableCell align="right">
          <IconButton disableRipple color="inherit" size="small">
            <Icon className="text-24 arrow-icon">plagiarism</Icon>
          </IconButton>
        </TableCell> */}
        <TableCell align="justify">
          <IconButton
            onClick={() => {
              handleClickOpenEdit(row.id);
            }}
            disableRipple
            color="inherit"
            size="small"
          >
            <Icon className="text-24 arrow-icon">create</Icon>
          </IconButton>
        </TableCell>
        {/* <TableCell align="right">
          <IconButton disableRipple color="inherit" size="small">
            <Icon className="text-24 arrow-icon">delete</Icon>
          </IconButton>
        </TableCell> */}
      </StyledTableRow>
      <TableRow style={{ backgroundColor: `${open ? 'rgb(234 237 239 / 50%)' : ''}` }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography className="mb-16" variant="overline" gutterBottom component="div">
                <strong>ADMINS</strong>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleClickOpenDelete(1, 1, row.id, 0)} // delID 1 for all, nominee 1 for admin
                  className="mr-16"
                  style={{ float: 'right' }}
                  startIcon={<Icon>delete_forever</Icon>}
                >
                  Remove All
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleClickOpenAddEdit(row.id, 0)}
                  className="mr-8"
                  style={{ float: 'right' }}
                  startIcon={<Icon>add_circle</Icon>}
                >
                  Add New
                </Button>
              </Typography>
              <Table style={{ backgroundColor: '#f2f2f2' }} size="small" aria-label="purchases">
                <TableHead style={{ backgroundColor: 'rgb(219 225 236)' }}>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell align="justify">Email</TableCell>
                    <TableCell align="justify">Date</TableCell>
                    {/* <TableCell align="right">Add</TableCell> */}
                    <TableCell width={10} />
                    <TableCell width={10} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.admins.length > 0 ? (
                    <>
                      {row.admins.map((adminRow) => (
                        <TableRow key={adminRow.key}>
                          <TableCell component="th" scope="row">
                            <div className="flex items-center">
                              <Avatar className="mx-8" alt="" src={adminRow.userImage} />
                              <span className="ml-8">{adminRow.userName}</span>
                            </div>
                          </TableCell>
                          <TableCell align="justify">{adminRow.userEmail}</TableCell>
                          <TableCell align="justify">{adminRow.createdOn}</TableCell>
                          {/* <TableCell align="right">
                            <IconButton disableRipple color="inherit" size="small">
                              <Icon className="text-24 arrow-icon">laptop_mac</Icon>
                            </IconButton>
                          </TableCell> */}
                          <TableCell align="justify">
                            <IconButton
                              onClick={() =>
                                handleClickOpenAddEdit(
                                  adminRow.machineID,
                                  adminRow.machineAdminID,
                                  adminRow
                                )
                              }
                              disableRipple
                              color="inherit"
                              size="small"
                            >
                              <Icon className="text-24 arrow-icon">create</Icon>
                            </IconButton>
                          </TableCell>
                          <TableCell align="justify">
                            <IconButton
                              onClick={() =>
                                handleClickOpenDelete(
                                  2,
                                  1,
                                  adminRow.machineID,
                                  adminRow.machineAdminID
                                )
                              } // (delID)=> 1 for all, 2 for specific, (nominee)=> 1 for admin, 2 for invite
                              disableRipple
                              color="inherit"
                              size="small"
                            >
                              <Icon className="text-24 arrow-icon">delete</Icon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <TableCell colSpan={6}>
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
      <TableRow style={{ backgroundColor: `${open ? 'rgb(234 237 239 / 50%)' : ''}` }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography className="mb-16" variant="overline" gutterBottom component="div">
                <strong>INVITES</strong>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleClickOpenDelete(1, 2, row.id, 0)} // delID 1 for all, nominee 1 for admin
                  className="mr-16"
                  style={{ float: 'right' }}
                  startIcon={<Icon>delete_forever</Icon>}
                >
                  Remove All
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    dispatch(openNewInviteDialog(row));
                  }}
                  className="mr-8"
                  style={{ float: 'right' }}
                  startIcon={<Icon>add_circle</Icon>}
                >
                  Add New
                </Button>
              </Typography>
              <Table style={{ backgroundColor: '#f2f2f2' }} size="small" aria-label="purchases">
                <TableHead style={{ backgroundColor: 'rgb(219 225 236)' }}>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell align="justify">Title</TableCell>
                    {/* <TableCell align="right">Email</TableCell> */}
                    <TableCell align="justify">Date</TableCell>
                    {/* <TableCell align="right">Add</TableCell> */}
                    <TableCell width={10} />
                    <TableCell width={10} />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.invites.length > 0 ? (
                    <>
                      {row.invites.map((usersRow) => (
                        <TableRow key={usersRow.key}>
                          <TableCell component="th" scope="row">
                            <div className="flex items-center">
                              <Avatar className="mx-8" alt="" src={usersRow.userImage} />
                              <span className="ml-8">{usersRow.userName}</span>
                            </div>
                          </TableCell>
                          <TableCell align="justify">{usersRow.title}</TableCell>
                          {/* <TableCell align="right">{usersRow.userEmail}</TableCell> */}
                          <TableCell align="justify">{usersRow.createdOn}</TableCell>
                          {/* <TableCell align="justify">
                            <IconButton disableRipple color="inherit" size="small">
                              <Icon className="text-24 arrow-icon">laptop_mac</Icon>
                            </IconButton>
                          </TableCell> */}
                          <TableCell align="justify">
                            <IconButton disableRipple color="inherit" size="small">
                              <Icon
                                className="text-24 arrow-icon"
                                onClick={(ev) => {
                                  ev.stopPropagation();
                                  dispatch(openEditInviteDialog(usersRow));
                                }}
                              >
                                create
                              </Icon>
                            </IconButton>
                          </TableCell>
                          <TableCell align="justify">
                            <IconButton
                              onClick={() =>
                                handleClickOpenDelete(2, 2, usersRow.machineID, usersRow.inviteId)
                              } // (delID)=> 1 for all, 2 for specific, (nominee)=> 1 for admin, 2 for invite
                              disableRipple
                              color="inherit"
                              size="small"
                            >
                              <Icon className="text-24 arrow-icon">delete</Icon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : (
                    <TableCell colSpan={7}>
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

export default MyCompTableRow;
