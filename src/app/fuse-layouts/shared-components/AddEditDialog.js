import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { addEditAdmin } from 'app/auth/store/mineSlice';
import { setAuthLoader } from 'app/auth/store/loadersSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  userEmail: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

const defaultValues = {
  userEmail: '',
  grantFuther: true,
};

function AddEditDialog(props) {
  const { onCloseAddEdit, openAddEdit, adminID, machineID } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  // const [callResp, setCallResp] = useState('');
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const loaders = useSelector(({ auth }) => auth.loaders);
  const data = useSelector(({ auth }) => auth.mine.data);

  const initDialog = useCallback(() => {
    // eslint-disable-next-line prefer-const
    if (adminID) {
      const adminReqData = props.adminData;
      reset({ ...adminReqData });
    } else {
      reset(defaultValues);
    }
  }, [adminID, props.adminData, reset]);

  useEffect(() => {
    if (props.openAddEdit) {
      initDialog();
    }
  }, [props.openAddEdit, initDialog]);

  function onSubmit(model) {
    const body = {
      id: adminID,
      machineId: machineID,
      email: model.userEmail,
      grantFuther: model.grantFuther ? model.grantFuther : false,
    };
    dispatch(setAuthLoader(true));
    dispatch(addEditAdmin(body));
    // reset(defaultValues);
  }

  const handleCloseAddEdit = () => {
    onCloseAddEdit();
  };

  return (
    <Dialog onClose={handleCloseAddEdit} open={openAddEdit}>
      <IconButton color="primary" className="fixed" onClick={handleCloseAddEdit}>
        <Icon>cancel</Icon>
      </IconButton>
      <div className="w-auto p-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
        >
          <Card
            // component={motion.div}
            initial={{ x: 200 }}
            animate={{ x: 0 }}
            transition={{ bounceDamping: 0 }}
            className="w-full max-w-400 mx-auto md:m-0 rounded-20 md:rounded-none"
            square
            layout
          >
            <CardContent className="flex flex-col items-center justify-center p-8 sm:p-16 md:p-24 md:pt-40 ">
              <Typography variant="h6" className="mb-48 font-semibold text-18 sm:text-24">
                <span style={{ color: 'white' }}>------</span>
                {adminID ? 'Update Admin' : 'Add Admin'}
                <span style={{ color: 'white' }}>------</span>
              </Typography>

              <form
                name="adminForm"
                noValidate
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                {loaders.authLoader ? (
                  <CircularProgress
                    style={{
                      marginTop: '12%',
                      marginLeft: '40%',
                      width: 48,
                      height: 48,
                      marginBottom: 80,
                    }}
                    color="secondary"
                  />
                ) : (
                  <>
                    <Controller
                      name="userEmail"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-16"
                          label="Email"
                          autoFocus
                          type="email"
                          error={!!errors.userEmail}
                          helperText={errors?.name?.userEmail}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="grantFuther"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <FormControlLabel
                          className="mt-8 mb-16"
                          label="Grant Further"
                          control={
                            <Switch
                              onChange={(ev) => {
                                onChange(ev.target.checked);
                              }}
                              checked={value}
                              name="grantFuther"
                            />
                          }
                        />
                      )}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      className="w-224 mx-auto mt-16"
                      aria-label="Reset"
                      disabled={_.isEmpty(dirtyFields) || !isValid}
                      type="submit"
                    >
                      {adminID ? 'Update Admin' : 'Add Admin'}
                    </Button>
                  </>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </Dialog>
  );
}

export default AddEditDialog;
