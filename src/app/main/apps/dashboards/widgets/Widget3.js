import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Widget3(props) {
  const history = useHistory();
  const statsData = useSelector(({ auth }) => auth.mine);

  return (
    <Paper className="w-full rounded-20 shadow flex flex-col justify-between">
      <div className="flex items-center justify-between px-4 pt-8">
        <Typography className="text-16 px-16 font-medium" color="textSecondary">
          My Invitations
        </Typography>
        <IconButton
          onClick={() => {
            history.push({
              pathname: '/pages/invites',
            });
          }}
          aria-label="more"
          size="large"
        >
          <Icon>create</Icon>
        </IconButton>
      </div>
      <div className="text-center py-12">
        <Typography className="text-72 font-semibold leading-none text-orange tracking-tighter">
          {statsData.stats.invities ? statsData.stats.invities : 0}
        </Typography>
        <Typography className="text-18 font-normal text-orange-800">
          {/* Number of my invitations by other users */}
        </Typography>
      </div>
      <div className="p-8 pt-0 flex justify-center items-end">
        <Button
          variant="contained"
          onClick={() => {
            history.push({
              pathname: '/pages/invites',
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

export default memo(Widget3);
