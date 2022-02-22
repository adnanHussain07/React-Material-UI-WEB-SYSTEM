import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InvitesTable from 'app/main/pages/Invites/InvitesTable';
import { memo, useState } from 'react';
import { useHistory } from 'react-router-dom';

function InvitesWidget(props) {
  const history = useHistory();

  return (
    <Paper className="w-full rounded-20 shadow">
      <div className="flex items-center justify-between p-20 h-64 ">
        <Typography className="text-16 font-medium">My Invitations</Typography>

        <Button
          classes={{ select: 'py-8' }}
          variant="contained"
          onClick={() => {
            history.push({
              pathname: '/pages/invites',
            });
          }}
          color="primary"
          // style={{ backgroundColor: 'rgb(238 237 237)', color: 'black' }}
        >
          See More
        </Button>
      </div>
      <InvitesTable count={5} />
    </Paper>
  );
}

export default memo(InvitesWidget);
