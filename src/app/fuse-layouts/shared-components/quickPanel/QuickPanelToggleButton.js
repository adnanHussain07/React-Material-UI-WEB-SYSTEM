import Icon from '@mui/material/Icon';
// import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { useDispatch } from 'react-redux';
import { toggleQuickPanel } from './store/stateSlice';

function QuickPanelToggleButton(props) {
  const dispatch = useDispatch();

  return (
    <Button
      className="pr-16 mr-10"
      onClick={(ev) => dispatch(toggleQuickPanel())}
      size="small"
      variant="contained"
      startIcon={<DownloadIcon />}
      style={{ backgroundColor: 'rgb(238 237 237)', color: 'black' }}
    >
      Download
    </Button>
    // <IconButton className="w-40 h-40" onClick={(ev) => dispatch(toggleQuickPanel())} size="large">
    //   {props.children}
    // </IconButton>
  );
}

QuickPanelToggleButton.defaultProps = {
  children: <Icon>get_app</Icon>,
};

export default QuickPanelToggleButton;
