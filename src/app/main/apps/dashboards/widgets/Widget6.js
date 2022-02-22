import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import _ from '@lodash';
import { useEffect, memo, useState } from 'react';
import Button from '@mui/material/Button';
import MyComputerTable from 'app/main/pages/MyComputer/MyComputerTable';
import { useHistory } from 'react-router-dom';

function Widget6(props) {
  // const [currentRange, setCurrentRange] = useState(props.widget.currentRange);
  const [awaitRender, setAwaitRender] = useState(true);
  const history = useHistory();

  const widget = _.merge({}, props.widget);
  const theme = useTheme();

  // function handleChangeRange(ev) {
  //   setCurrentRange(ev.target.value);
  // }

  _.setWith(widget, 'mainChart.options.theme.monochrome.color', theme.palette.secondary.main);

  useEffect(() => {
    setAwaitRender(false);
  }, []);

  if (awaitRender) {
    return null;
  }

  return (
    <Paper className="w-full rounded-20 shadow">
      <div className="flex items-center justify-between p-20 h-64 ">
        <Typography className="text-16 font-medium">My Computer List</Typography>

        <Button
          classes={{ select: 'py-8' }}
          variant="contained"
          color="primary"
          onClick={() => {
            history.push({
              pathname: '/pages/computer',
            });
          }}
          // style={{ backgroundColor: 'rgb(238 237 237)', color: 'black' }}
        >
          See More
        </Button>
      </div>
      <MyComputerTable count={5} />
    </Paper>
  );
}

export default memo(Widget6);
