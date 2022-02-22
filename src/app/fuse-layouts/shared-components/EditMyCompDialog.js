import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { mineCompUpdate } from 'app/auth/store/mineSlice';
import { setAuthLoader } from 'app/auth/store/loadersSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
});

const defaultValues = {
  name: '',
};

function EditMyCompDialog(props) {
  const { onCloseEdit, openEdit, id } = props;
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
    let obj = { name: '' };
    if (data.records && data.records.length > 0) {
      obj.name =
        data.records.filter((q) => q.userMachine.id === id).length > 0
          ? data.records.filter((q) => q.userMachine.id === id)[0].userMachine.machineName
          : '';
    }
    reset({ ...obj });
  }, [data, reset, id]);

  useEffect(() => {
    if (props.openEdit) {
      initDialog();
    }
  }, [props.openEdit, initDialog]);

  function onSubmit(model) {
    const body = {
      id,
      title: model.name,
    };
    dispatch(setAuthLoader(true));
    dispatch(mineCompUpdate(body));
    // reset(defaultValues);
  }

  const handleCloseEdit = () => {
    onCloseEdit();
  };

  return (
    <Dialog onClose={handleCloseEdit} open={openEdit}>
      <IconButton color="primary" className="fixed" onClick={handleCloseEdit}>
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
                Update Name of Machine
              </Typography>

              <form
                name="machineForm"
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
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-16"
                          label="Name"
                          autoFocus
                          type="text"
                          error={!!errors.name}
                          helperText={errors?.name?.message}
                          variant="outlined"
                          required
                          fullWidth
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
                      Update Machine
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

export default EditMyCompDialog;
