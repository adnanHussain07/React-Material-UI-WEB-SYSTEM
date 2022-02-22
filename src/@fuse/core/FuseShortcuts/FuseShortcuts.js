import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { selectFlatNavigation } from 'app/store/fuse/navigationSlice';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { memo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { updateUserShortcuts } from 'app/auth/store/userSlice';
import Button from '@mui/material/Button';

const shortcuts = ['dashboards', 'my-computer', 'invite', 'calendar', 'myprofile'];

function FuseShortcuts(props) {
  const dispatch = useDispatch();
  // const shortcuts = useSelector(({ auth }) => auth.user.data.shortcuts) || [];
  const navigation = useSelector(selectFlatNavigation);
  const user = useSelector(({ auth }) => auth.user);

  const searchInputRef = useRef(null);
  const [addMenu, setAddMenu] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const shortcutItems = shortcuts
    ? shortcuts.map((id) => navigation.find((item) => item.id === id))
    : [];

  function addMenuClick(event) {
    setAddMenu(event.currentTarget);
  }

  function addMenuClose() {
    setAddMenu(null);
  }

  function search(ev) {
    const newSearchText = ev.target.value;

    setSearchText(newSearchText);

    if (newSearchText.length !== 0 && navigation) {
      setSearchResults(
        navigation.filter((item) => item.title.toLowerCase().includes(newSearchText.toLowerCase()))
      );
      return;
    }
    setSearchResults(null);
  }

  function toggleInShortcuts(id) {
    let newShortcuts = [...shortcuts];
    newShortcuts = newShortcuts.includes(id)
      ? newShortcuts.filter((_id) => id !== _id)
      : [...newShortcuts, id];
    // dispatch(updateUserShortcuts(newShortcuts));
  }

  function ShortcutMenuItem({ item, onToggle }) {
    return (
      <Link to={item.url} role="button">
        <MenuItem key={item.id}>
          <ListItemIcon className="min-w-40">
            {item.icon ? (
              <Icon>{item.icon}</Icon>
            ) : (
              <span className="text-20 font-semibold uppercase text-center">{item.title[0]}</span>
            )}
          </ListItemIcon>
          <ListItemText primary={item.title} />
          <IconButton
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              onToggle(item.id);
            }}
            size="large"
          >
            <Icon color="action">{shortcuts.includes(item.id) ? 'star' : 'star_border'}</Icon>
          </IconButton>
        </MenuItem>
      </Link>
    );
  }
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <div
      className={clsx(
        'flex flex-1',
        props.variant === 'vertical' && 'flex-col flex-grow-0 flex-shrink',
        props.className
      )}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={clsx('flex flex-1', props.variant === 'vertical' && 'flex-col')}
      >
        {shortcutItems.map(
          (_item) =>
            _item && (
              <Link to={_item.url} key={_item.id} role="button">
                <Tooltip
                  title={_item.title}
                  placement={props.variant === 'horizontal' ? 'bottom' : 'left'}
                >
                  <IconButton
                    className="w-40 h-40 p-0"
                    component={motion.div}
                    variants={item}
                    size="large"
                  >
                    {_item.icon ? (
                      <Icon>{_item.icon}</Icon>
                    ) : (
                      <span className="text-20 font-semibold uppercase">{_item.title[0]}</span>
                    )}
                  </IconButton>
                </Tooltip>
              </Link>
            )
        )}

        <Tooltip
          title="Click to QR CODE"
          placement={props.variant === 'horizontal' ? 'bottom' : 'left'}
        >
          <IconButton
            component={motion.div}
            variants={item}
            className="w-40 h-40 p-0"
            aria-owns={addMenu ? 'add-menu' : null}
            aria-haspopup="true"
            onClick={addMenuClick}
            size="large"
          >
            <Icon>qr_code_scanner</Icon>
            {/* <Icon sx={{ color: amber[600] }}>star</Icon> */}
          </IconButton>
        </Tooltip>
      </motion.div>

      {/* QR CODE */}
      <Menu
        id="add-menu"
        anchorEl={addMenu}
        open={Boolean(addMenu)}
        onClose={addMenuClose}
        classes={{
          paper: 'mt-48 min-w-256',
        }}
      >
        <div
          style={{
            textAlign: '-webkit-center',
          }}
        >
          <img
            className="max-w-256 w-266 h-184"
            src={user.userData.mfaImgBase ? user.userData.mfaImgBase : ''}
            alt="MFA Secret"
          />
        </div>

        <div>
          <table className="mb-16 mt-24">
            <tbody>
              <tr>
                <td className="pb-4 pl-12">
                  <Button
                    variant="contained"
                    color="primary"
                    aria-label="Send Message"
                    startIcon={<Icon className="hidden sm:flex">qr_code_scanner</Icon>}
                  >
                    <Typography className="font-light" variant="h6" color="inherit">
                      <strong>{user.userData.mfaSecret ? user.userData.mfaSecret : '- - -'}</strong>
                    </Typography>
                  </Button>
                </td>
                <td className="pb-4 px-8" />
              </tr>

              {/* <tr>
                <td className="pb-4 pl-24">
                  <Typography className="font-light" variant="h6" color="textSecondary">
                    Code 2
                  </Typography>
                </td>
                <td className="pb-4 px-8">
                  <Typography className="font-light" variant="h6" color="inherit">
                    <strong>QW90JKLDD</strong>
                  </Typography>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>

        {/* <div className="p-16 pt-8">
          <Input
            inputRef={searchInputRef}
            value={searchText}
            onChange={search}
            placeholder="Search for an app or page"
            className=""
            fullWidth
            inputProps={{
              'aria-label': 'Search',
            }}
            disableUnderline
          />
        </div> */}

        {/* <Divider /> */}

        {/* {searchText.length !== 0 &&
          searchResults &&
          searchResults.map((_item) => (
            <ShortcutMenuItem
              key={_item.id}
              item={_item}
              onToggle={() => toggleInShortcuts(_item.id)}
            />
          ))}

        {searchText.length !== 0 && searchResults.length === 0 && (
          <Typography color="textSecondary" className="p-16 pb-8">
            No results..
          </Typography>
        )} */}

        {/* {searchText.length === 0 &&
          shortcutItems.map(
            (_item) =>
              _item && (
                <ShortcutMenuItem
                  key={_item.id}
                  item={_item}
                  onToggle={() => toggleInShortcuts(_item.id)}
                />
              )
          )} */}
      </Menu>
    </div>
  );
}

FuseShortcuts.propTypes = {};
FuseShortcuts.defaultProps = {
  variant: 'horizontal',
};

export default memo(FuseShortcuts);
