import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
// import Typography from '@mui/material/Typography';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function QRCodeDialog(props) {
  const { onClose, selectedValue, open } = props;
  const user = useSelector(({ auth }) => auth.user);

  const handleClose = () => {
    onClose(selectedValue);
  };

  //   const handleListItemClick = (value) => {
  //     onClose(value);
  //   };

  return (
    <Dialog onClose={handleClose} open={open}>
      <IconButton color="primary" className="fixed" onClick={handleClose}>
        <Icon>cancel</Icon>
      </IconButton>
      <DialogTitle>
        {/* <Typography variant="h5" className="flex justify-center opacity-75 muiltr-1i9360j">
          2 FACTOR AUTHENTICATION
        </Typography> */}
      </DialogTitle>
      <div
        style={{
          textAlign: '-webkit-center',
        }}
      >
        <img
          className="max-w-296 w-288 h-222"
          src={user.userData.mfaImgBase ? user.userData.mfaImgBase : ''}
          alt="product"
        />
      </div>

      <div>
        <table className="mb-16 mt-24">
          <tbody>
            <tr>
              <td className="pb-4 pl-12">
                {/* 

                <Typography className="font-light" variant="h6" color="textSecondary">
                  MFA Secret
                </Typography> */}
              </td>
              <td className="pb-4 px-14 sm:px-8">
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
            </tr>

            {/* <tr>
              <td className="pb-4 pl-28">
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

      {/* <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}

        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List> */}
    </Dialog>
  );
}
