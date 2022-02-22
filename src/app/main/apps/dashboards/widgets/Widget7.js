import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import OtherComputerTable from 'app/main/pages/MyComputer/OtherComputerTable';
import { memo, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { useHistory } from 'react-router-dom';

function Widget7(props) {
  // const [currentRange, setCurrentRange] = useState(props.widget.currentRange);
  const history = useHistory();

  // function handleChangeRange(ev) {
  //   setCurrentRange(ev.target.value);
  // }

  return (
    <Paper className="w-full rounded-20 shadow">
      <div className="flex items-center justify-between p-20 h-64 ">
        <Typography className="text-16 font-medium">Other Computer List</Typography>

        <Button
          classes={{ select: 'py-8' }}
          variant="contained"
          onClick={() => {
            history.push({
              pathname: '/pages/computer',
            });
          }}
          color="primary"
          // style={{ backgroundColor: 'rgb(238 237 237)', color: 'black' }}
        >
          See More
        </Button>
      </div>
      <OtherComputerTable count={5} />
    </Paper>
  );
}

export default memo(Widget7);
