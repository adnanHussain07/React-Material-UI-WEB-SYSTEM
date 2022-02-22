import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Widget1(props) {
  // const [currentRange, setCurrentRange] = useState(props.widget.currentRange);
  const statsData = useSelector(({ auth }) => auth.mine);
  const history = useHistory();

  return (
    <Paper className="w-full rounded-20 shadow flex flex-col justify-between">
      <div className="flex items-center justify-between px-4 pt-8">
        <Typography className="text-16 px-16 font-medium" color="textSecondary">
          My Personal Machines
        </Typography>
        <IconButton
          onClick={() => {
            history.push({
              pathname: '/pages/computer',
            });
          }}
          aria-label="more"
          size="large"
        >
          <Icon>create</Icon>
        </IconButton>
      </div>
      <div className="text-center py-12">
        <Typography className="text-72 font-semibold leading-none text-blue tracking-tighter">
          {statsData.stats.machines ? statsData.stats.machines : 0}
        </Typography>
        <Typography className="text-18 text-blue-800 font-normal">
          {/* Number of my personal machines */}
        </Typography>
      </div>
      <div className="p-8 pt-0 flex justify-center items-end">
        <Button
          variant="contained"
          onClick={() => {
            history.push({
              pathname: '/pages/computer',
            });
          }}
          style={{ backgroundColor: 'rgb(238 237 237)', color: 'black' }}
        >
          See All
        </Button>
      </div>
    </Paper>
  );
}

export default memo(Widget1);
