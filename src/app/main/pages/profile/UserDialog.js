/* eslint-disable jsx-a11y/label-has-associated-control */
import { useCallback, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Fab from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Icon from '@mui/material/Icon';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPic, updateProfile, setProfileUpdated } from 'app/auth/store/userSlice';

import _ from '@lodash';
import * as yup from 'yup';

const userDialog = {
  type: 'edit',
};

const defaultValues = {
  identifier: '',
  firendlyName: '',
  firstName: '',
  lastName: '',
  mfaSecret: '',
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  identifier: yup.string().required('You must enter email address'),
  firendlyName: yup
    .string()
    .required('You must enter your display name')
    .min(5, 'Display Name is too short - should be 4 chars minimum.')
    .max(12, 'Display Name is too long - should be 12 chars maximum.'),
  firstName: yup.string().required('You must enter your first name'),
  lastName: yup.string().required('You must enter your last name'),
  mfaSecret: yup.string().required('You must enter MFA Secret'),
});

function UserDialog(props) {
  const { onClose, open } = props;
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user.userData);
  const userUpdated = useSelector(({ auth }) => auth.user.profileUpdated);

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, dirtyFields, errors } = formState;

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    reset({ ...user });
  }, [reset, user]);

  useEffect(() => {
    if (props.open) {
      initDialog();
    }
  }, [props.open, initDialog]);

  useEffect(() => {
    let mounted = true;
    if (mounted && userUpdated) {
      handleClose();
      dispatch(setProfileUpdated(false));
    }

    return () => {
      mounted = false;
    };
  }, [userUpdated]);

  const handleClose = () => {
    onClose();
  };

  const onFileChange = (event) => {
    const uploadFile = event.target.files[0];
    // eslint-disable-next-line prefer-const
    let data = new FormData();
    data.append('file', uploadFile);
    dispatch(uploadPic(data));
  };

  function onSubmit(model) {
    const body = {
      firstName: model.firstName,
      lastName: model.lastName,
      firendlyName: model.firendlyName,
      mfaSecret: model.mfaSecret,
    };
    dispatch(updateProfile(body));
  }

  return (
    <Dialog
      classes={{
        paper: 'm-24',
      }}
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="xs"
    >
      <AppBar position="static" elevation={0}>
        <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
        <Toolbar className="flex w-full justify-center" style={{ marginTop: '-10px' }}>
          <Typography variant="subtitle2" color="inherit">
            To upload picture click on <PhotoCamera /> on right corner of image.
          </Typography>
        </Toolbar>
        <input
          accept="image/*"
          id="uploadFile2"
          type="file"
          onChange={onFileChange}
          style={{ display: 'none' }}
        />
        <div className="flex flex-col items-center justify-center pb-24">
          <div className="relative">
            <div className="absolute right-0 bottom-0 -m-8 z-10">
              <label htmlFor="uploadFile2">
                <div>
                  <Fab size="small" component="span" color="pirmary" aria-label="Upload">
                    <PhotoCamera />
                  </Fab>
                </div>
              </label>
            </div>

            <Avatar className="w-96 h-96" alt="contact avatar" src={user.userImage} />
          </div>
          <Typography variant="h6" color="inherit" className="pt-16">
            {`${user.firstName} ${user.lastName}`}
          </Typography>
        </div>
      </AppBar>
      <form
        name="userForm"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:overflow-hidden"
      >
        <DialogContent classes={{ root: 'p-24' }}>
          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">mail</Icon>
            </div>
            <Controller
              control={control}
              name="identifier"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="User Email"
                  id="identifier"
                  error={!!errors.identifier}
                  helperText={errors?.identifier?.message}
                  variant="outlined"
                  required
                  fullWidth
                  value={user.identifier}
                  disabled
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_box</Icon>
            </div>
            <Controller
              control={control}
              name="firendlyName"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Display Name"
                  id="firendlyName"
                  error={!!errors.firendlyName}
                  helperText={errors?.firendlyName?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="First Name"
                  id="firstName"
                  error={!!errors.firstName}
                  helperText={errors?.firstName?.message}
                  required
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">account_circle</Icon>
            </div>
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Last Name"
                  id="lastName"
                  error={!!errors.lastName}
                  helperText={errors?.lastName?.message}
                  required
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex">
            <div className="min-w-48 pt-20">
              <Icon color="action">qr_code_scanner</Icon>
            </div>
            <Controller
              control={control}
              name="mfaSecret"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="MFA Secret"
                  id="mfaSecret"
                  error={!!errors.mfaSecret}
                  helperText={errors?.mfaSecret?.message}
                  required
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>
        </DialogContent>

        {userDialog.type === 'new' ? (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Add
              </Button>
            </div>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between p-4 pb-16">
            <div className="px-16">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Save
              </Button>
            </div>
            <div className="px-16">
              <Button
                // className="ml-12"
                variant="contained"
                color="error"
                onClick={handleClose}
                // disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Cancel
              </Button>
            </div>
            {/* <IconButton onClick={handleRemove} size="large">
              <Icon>delete</Icon>
            </IconButton> */}
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default UserDialog;
