import React from 'react';
import Paper from '@mui/material/Paper';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import Icon from '@mui/material/Icon';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled, useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

function useForceUpdate() {
  const [values, setValues] = React.useState(0); // integer state
  return () => setValues(values + 1); // update the state to force render
}

function Schedules() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const forceUpdate = useForceUpdate();
  const [selectedDate, setSelectedDate] = React.useState(moment().format('MM/DD/YYYY'));
  const [getData, setData] = React.useState([]);
  const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [selectedDateFormatted, setSelectedDateFormatted] = React.useState(
    moment().format('dddd, MMMM Do, YYYY')
  );

  React.useEffect(() => {
    let mounted = true;
    if (mounted) {
      const month = moment('2022-02', 'YYYY-MM');

      const currentMonthDates = new Array(moment().daysInMonth()).fill(month).map((x, i) => moment().startOf('month').add(i, 'days'));
      //  ._d ko format kar k calendar me (feb 2 tues) ka ye syntax hai nechy daikh lo
      // moment(e.Date).format('MMM')
      // moment(e.Date).format('Do')
      // moment(e.Date).format('ddd')

      const rows = [
        {
          name: 'JOHN MCGRAGER',
        },
        {
          name: 'ELY MCGRAGER',
        },
        {
          name: 'JONATHAN ERIC',
        },
        {
          name: 'SCHWINSTINGER',
        },
        {
          name: 'NELSON ERICSON',
        },
        {
          name: 'HEN KAMALA',
        },
        {
          name: 'PSWICH KISSINGER',
        },
        {
          name: 'SHAWN MICHAEL',
        },
        {
          name: 'KRIG STALLINSON',
        },
        {
          name: 'NANDA',
        },
      ];
      const col = [
        {
          type: 'S1',
          date: 'Ent. Hrs',
        },
        {
          type: 'S2',
          date: 'Con. Hrs',
        },
        {
          type: 'S3',
          date: 'Rem. Hrs',
        },
        {
          day: 'Mon',
          date: 1,
          month: 'Feb',
        },
        {
          date: 2,
        },
        {
          date: 3,
        },
        {
          date: 4,
        },
        {
          date: 5,
        },
        {
          date: 6,
        },
        {
          date: 7,
        },
        {
          date: 8,
        },
        {
          date: 9,
        },
        {
          date: 11,
        },
        {
          date: 12,
        },
        {
          date: 13,
        },
        {
          date: 14,
        },
        {
          date: 15,
        },
        {
          date: 16,
        },
        {
          date: 18,
        },
        {
          date: 19,
        },
        {
          date: 20,
        },
        {
          date: 21,
        },
        {
          date: 22,
        },
        {
          date: 23,
        },
        {
          date: 24,
        },
        {
          date: 25,
        },
        {
          date: 26,
        },
        {
          date: 27,
        },
        {
          date: 28,
        },
        {
          date: 29,
        },
        {
          date: 30,
        },
        {
          date: 31,
        },
        {
          type: 'L1',
          date: 'Con. Hrs',
        },
        {
          type: 'L2',
          date: 'Rem. Hrs',
        },
      ];
      const data = rows.map((e) => {
        return {
          name: e.name,
          col: [...col],
        };
      });
      setData(data);
    }
    return () => {
      mounted = false;
    };
  }, []);

  const StyledHeaderCell = styled(TableCell)(({ themes }) => ({
    [`&.${tableCellClasses.head}`]: {
      //   backgroundColor: theme.palette.common.black,
      //   color: theme.palette.common.white,
      fontSize: 10,
      fontWeight: 'bold',
      padding: '0px 5px',
      border: 'solid 1px',
      borderColor: '#838383e0',
      background: '#515151e3',
      color: '#fff',
      cursor: 'pointer',
    },
  }));
  const StyledEmployeeHeaderCell = styled(TableCell)(({ themes }) => ({
    [`&.${tableCellClasses.head}`]: {
      //   backgroundColor: theme.palette.common.black,
      //   color: theme.palette.common.white,
      //   border: 'solid 1px',
      //   borderColor: '#be2ec7e0',
      background: '#bfbfbfe0',
      color: 'black',
    },
  }));
  const StyledBodyCell = styled(TableCell)(({ themes }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 7,
      fontWeight: 'bold',
      padding: '10px 10px',
      border: 'solid 1px',
      borderColor: '#b0b1afad',
      //   innerHeight: 10
    },
    ':hover': {
      background: '#2fb72d',
    },
  }));
  const StyledEmployeeCell = styled(TableCell)(({ themes }) => ({
    [`&.${tableCellClasses.body}`]: {
      fontSize: 7,
      fontWeight: 'bold',
      padding: '10px 10px',
      border: 'solid 1px',
      borderColor: '#b0b1afad',
      boxShadow: '0 0 8px 0 #392d2d',
      WebkitClipPath: 'inset(0 -15px 0 -15px)',
      minWidth: '100px',
      cursor: 'pointer',
      //   innerHeight: 10
    },
  }));
  const StyledBodyRow = styled(TableRow)(({ themes }) => ({
    ':root': {
      innerHeight: 0,
      outerHeight: 0,
    },
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    // },
    // // hide last border
    // '&:last-child td, &:last-child th': {
    //   border: 0,
    // },
  }));
  const StyledHeaderRow = styled(TableRow)(({ themes }) => ({
    ':root': {
      boxShadow: '0 0 8px 0 #392d2d',
    },
    // '&:nth-of-type(odd)': {
    //   backgroundColor: themes.palette.action.hover,
    // },
    // // hide last border
    // '&:last-child td, &:last-child th': {
    //   border: 0,
    // },
  }));

  const handleDateChange = (event) => {
    setAge(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Header = () => {
    return (
      <div className="bg-gray-200 p-16">
        <div className="flex justify-center ...">
          <div className="px-8 mt-8">
            <Button onClick={handleClickOpen} color="primary" variant="contained" size="medium">
              Select Criteria
            </Button>
          </div>
          <div className="px-8">
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">Month</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                size="small"
                // color=''
                label="Age *"
                onChange={handleDateChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              {/* <FormHelperText>Required</FormHelperText> */}
            </FormControl>
          </div>
          <div className="px-8">
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                size="small"
                // color='secondary'
                label="Age *"
                onChange={handleDateChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              {/* <FormHelperText>Required</FormHelperText> */}
            </FormControl>
          </div>
          <div className="px-8">
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">Absence</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                size="small"
                // color=''
                label="Age *"
                onChange={handleDateChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              {/* <FormHelperText>Required</FormHelperText> */}
            </FormControl>
          </div>
          <div className="px-8">
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">Shift Code</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                size="small"
                // color=''
                label="Age *"
                onChange={handleDateChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              {/* <FormHelperText>Required</FormHelperText> */}
            </FormControl>
          </div>
          <div className="px-8">
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">Quantity</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                size="small"
                // color=''
                label="Age *"
                onChange={handleDateChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              {/* <FormHelperText>Required</FormHelperText> */}
            </FormControl>
          </div>
          <div className="px-8">
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-required-label">Time Period</InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={age}
                size="small"
                // color=''
                label="Age *"
                onChange={handleDateChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              {/* <FormHelperText>Required</FormHelperText> */}
            </FormControl>
          </div>
          <div className="px-8">
            <div className="flex flex-col">
              <div>
                <FormControlLabel control={<Checkbox defaultChecked />} label="View Statistics" />
              </div>
              <div className="self-center">
                <Button className="bg-gray-400" variant="contained" size="small">
                  Load
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  function renderRow(props) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div">
        <ListItemButton>
          <ListItemText primary={`Item ${index + 1}`} />
        </ListItemButton>
      </ListItem>
    );
  }

  const DialogCriteria = () => {
    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          Batch Absence Entry - Employee Selection Criteria
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className="flex flex-row">
              <div>
                <div className="flex flex-col">
                  <div className="py-8 mt-16">
                    <FormControl required sx={{ m: 1, minWidth: 144 }}>
                      <InputLabel id="demo-simple-select-required-label">Company</InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={age}
                        size="medium"
                        // color=''
                        label="Age *"
                        onChange={handleDateChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      {/* <FormHelperText>Required</FormHelperText> */}
                    </FormControl>
                  </div>
                  <div className="py-8">
                    <FormControl required sx={{ m: 1, minWidth: 144 }}>
                      <InputLabel id="demo-simple-select-required-label">Pay Group</InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={age}
                        size="medium"
                        // color=''
                        label="Age *"
                        onChange={handleDateChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      {/* <FormHelperText>Required</FormHelperText> */}
                    </FormControl>
                  </div>
                  <div className="py-8">
                    <FormControl required sx={{ m: 1, minWidth: 144 }}>
                      <InputLabel id="demo-simple-select-required-label">
                        Structure Level
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={age}
                        size="medium"
                        // color=''
                        label="Age *"
                        onChange={handleDateChange}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                      {/* <FormHelperText>Required</FormHelperText> */}
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="ml-8">
                <Typography className="font-bold text-lg">Items</Typography>
                <Box
                  sx={{ width: '100%', height: 200, maxWidth: 360, bgcolor: 'background.paper' }}
                  className="shadow-md"
                >
                  <FixedSizeList
                    height={200}
                    width={360}
                    itemSize={46}
                    itemCount={200}
                    overscanCount={5}
                  >
                    {renderRow}
                  </FixedSizeList>
                </Box>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose} autoFocus>
            Save Selection Criteria
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  function onHeaderCellClick(ee) {
    // eslint-disable-next-line prefer-const
    let updateData = getData;
    if (!ee.type) {
      if (updateData && updateData.checkAllCol) {
        updateData.checkAllCol = false;
        // eslint-disable-next-line no-return-assign
        updateData.map((as) => (as.col.filter((qq) => qq.date === ee.date)[0].mark = false));
      } else {
        updateData.checkAllCol = true;
        // eslint-disable-next-line no-return-assign
        updateData.map((as) => (as.col.filter((qq) => qq.date === ee.date)[0].mark = 'checked'));
      }
      forceUpdate();
      setData(updateData);
    }
  }

  function onEmpoyeeCellClick(ee) {
    const shallowCopy = getData.filter((x) => x.name === ee.name);
    const data = getData;
    if (shallowCopy.length > 0) {
      const row = [...ee.col];
      const effectiveRow = [];
      const index = data.indexOf(data.filter((a) => a.name === ee.name)[0]);
      if (ee.checkAllRow) {
        for (let i = 0; i < row.length; i += 1) {
          if (!row[i].type) {
            const rrr = { ...row[i], mark: false };
            effectiveRow.push(rrr);
          } else {
            effectiveRow.push(row[i]);
          }
        }
        data[index].checkAllRow = false;
      } else {
        for (let i = 0; i < row.length; i += 1) {
          if (!row[i].type) {
            const rrr = { ...row[i], mark: 'checked' };
            effectiveRow.push(rrr);
          } else {
            effectiveRow.push(row[i]);
          }
        }
        data[index].checkAllRow = true;
      }
      data[index].col = effectiveRow;
      setData(data);
      forceUpdate();
    }
  }

  return (
    <div>
      <Header />
      <DialogCriteria />
      <div className="">
        <TableContainer component={Paper}>
          <Table aria-label="simple table" style={{ border: '2px', borderCollapse: 'unset' }}>
            <TableHead>
              <TableRow style={{ boxShadow: '0 0 8px 0 #392d2d' }} className="custom-box-shadow">
                <StyledHeaderCell align="center">
                  <div className="flex flex-col">
                    <div style={{ borderBottom: 'solid 1px' }}>January 2022</div>
                    <div>Leave Unpaid</div>
                  </div>
                </StyledHeaderCell>
                {getData &&
                  getData.length > 0 &&
                  getData[0].col.length > 0 &&
                  getData[0].col.map((qw, iop) => {
                    return (
                      <StyledHeaderCell
                        key={iop}
                        className="custom-box-shadow2 custom-col-width"
                        align="center"
                        onClick={() => onHeaderCellClick(qw)}
                      >
                        {iop > 2 && iop < 32 ? (
                          <>{`${getData[0].col[3].day} ${qw.date} ${getData[0].col[3].month}`}</>
                        ) : (
                          <>{`${qw.date}`}</>
                        )}
                      </StyledHeaderCell>
                    );
                  })}
              </TableRow>
            </TableHead>
            <TableBody style={{ borderCollapse: 'unset' }}>
              {getData &&
                getData.length > 0 &&
                getData.map((ee, key) => {
                  const tooltipName = ee.name;
                  let name = '';
                  if (ee.name) {
                    name = ee.name.length > 12 ? ee.name.substring(0, 11) : ee.name;
                  }
                  return (
                    <TableRow key={key}>
                      <StyledEmployeeCell onClick={() => onEmpoyeeCellClick(ee)}>
                        <p>{tooltipName}</p>
                      </StyledEmployeeCell>
                      {ee.col &&
                        ee.col.length > 0 &&
                        ee.col.map((rt, mn) => {
                          return (
                            <StyledBodyCell
                              key={mn}
                              className="custom-border-bottom-hide custom-td-ball"
                            >
                              {rt.mark && rt.mark === 'checked' && (
                                <Icon color="success">check</Icon>
                              )}
                            </StyledBodyCell>
                          );
                        })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-end p-8 ...">
          <div className="mr-8">
            <Button color="error" variant="contained">
              Clear All
            </Button>
          </div>
          <div>
            <Button color="success" variant="contained">
              Book Absence
            </Button>
          </div>
        </div>
        {/* <motion.div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={mn}>
            <Card className="flex flex-col h-256 shadow">
              <div
                className="flex flex-shrink-0 items-center justify-between px-24 h-64"
                style={{
                  background: 'blue',
                  color: 'purple',
                }}
              >
                <Typography className="font-medium truncate" color="inherit">
                  web
                </Typography>
                <div className="flex items-center justify-center opacity-75">
                  <Icon className="text-20 mx-8" color="inherit">
                    access_time
                  </Icon>
                  <div className="text-14 font-medium whitespace-nowrap">4 min</div>
                </div>
              </div>
              <CardContent className="flex flex-col flex-auto items-center justify-center">
                <Typography className="text-center text-16 font-medium">App</Typography>
                <Typography className="text-center text-13 mt-8 font-normal" color="textSecondary">
                  12
                </Typography>
              </CardContent>
              <CardActions className="justify-center pb-24">
                <Button className="justify-start px-32" color="primary" variant="outlined">
                  Start
                </Button>
              </CardActions>
              <LinearProgress
                className="w-full"
                variant="determinate"
                value={100}
                color="secondary"
              />
            </Card>
          </motion.div> */}
      </div>
    </div>
    // <FusePageSimple
    //   header={<Header />}
    //   content={
    //     <div className="">
    //       <TableContainer component={Paper}>
    //         <Table aria-label="simple table" style={{ border: '2px' }}>
    //           <TableHead>
    //             <TableRow className="custom-box-shadow ">
    //               <StyledHeaderCell align="center">EMPLOYEES</StyledHeaderCell>
    //               {getData &&
    //                 getData.col &&
    //                 getData.col.length > 0 &&
    //                 getData.col.map((qw, iop) => {
    //                   return (
    //                     <StyledHeaderCell
    //                       key={iop}
    //                       className="custom-box-shadow2 custom-col-width"
    //                       align="center"
    //                     >
    //                       {`${qw.date}`}
    //                     </StyledHeaderCell>
    //                   );
    //                 })}
    //             </TableRow>
    //           </TableHead>
    //           <TableBody>
    //             {getData &&
    //               getData.rows &&
    //               getData.rows.length > 0 &&
    //               getData.rows.map((ee, key) => {
    //                 const tooltipName = ee.name;
    //                 let name = '';
    //                 if (ee.name) {
    //                   name = ee.name.length > 12 ? ee.name.substring(0, 11) : ee.name;
    //                 }
    //                 return (
    //                   <TableRow key={key}>
    //                     <StyledEmployeeCell>
    //                       <p>{tooltipName}</p>
    //                     </StyledEmployeeCell>
    //                     {getData.col &&
    //                       getData.col.length > 0 &&
    //                       getData.col.map((rt, mn) => {
    //                         let asd = false;
    //                         let asdss = false;
    //                         if (mn === 4) {
    //                           asd = true;
    //                         } else if (mn === 129) {
    //                           asdss = true;
    //                         }
    //                         return (
    //                           <StyledBodyCell
    //                             key={mn}
    //                             className="custom-border-bottom-hide custom-td-ball"
    //                             style={{ background: asdss ? '#2fb72d' : '' }}
    //                             onClick={() => {
    //                               asdss = true;
    //                             }}
    //                           >
    //                             {asd && (
    //                               <img
    //                                 className=""
    //                                 src="assets/images/logos/prohibition.png"
    //                                 alt="logo"
    //                               />
    //                             )}
    //                             {/* <Paper className="w-full rounded-20 shadow flex flex-col justify-between" /> */}
    //                           </StyledBodyCell>
    //                         );
    //                       })}
    //                   </TableRow>
    //                 );
    //               })}
    //           </TableBody>
    //         </Table>
    //       </TableContainer>

    //       {/* <motion.div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={mn}>
    //         <Card className="flex flex-col h-256 shadow">
    //           <div
    //             className="flex flex-shrink-0 items-center justify-between px-24 h-64"
    //             style={{
    //               background: 'blue',
    //               color: 'purple',
    //             }}
    //           >
    //             <Typography className="font-medium truncate" color="inherit">
    //               web
    //             </Typography>
    //             <div className="flex items-center justify-center opacity-75">
    //               <Icon className="text-20 mx-8" color="inherit">
    //                 access_time
    //               </Icon>
    //               <div className="text-14 font-medium whitespace-nowrap">4 min</div>
    //             </div>
    //           </div>
    //           <CardContent className="flex flex-col flex-auto items-center justify-center">
    //             <Typography className="text-center text-16 font-medium">App</Typography>
    //             <Typography className="text-center text-13 mt-8 font-normal" color="textSecondary">
    //               12
    //             </Typography>
    //           </CardContent>
    //           <CardActions className="justify-center pb-24">
    //             <Button className="justify-start px-32" color="primary" variant="outlined">
    //               Start
    //             </Button>
    //           </CardActions>
    //           <LinearProgress
    //             className="w-full"
    //             variant="determinate"
    //             value={100}
    //             color="secondary"
    //           />
    //         </Card>
    //       </motion.div> */}
    //     </div>
    //   }
    // />
  );
}

export default Schedules;
