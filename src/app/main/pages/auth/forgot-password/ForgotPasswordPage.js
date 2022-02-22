import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FooterLayout1 from 'app/fuse-layouts/layout1/components/FooterLayout1';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import HeaderBar from 'app/fuse-layouts/shared-components/HeaderBar';
import SheepShareIntroSection from 'app/fuse-layouts/shared-components/SheepShareIntroSection';
import { forgotPassword } from 'app/auth/store/loginSlice';
import { setAuthLoader } from 'app/auth/store/loadersSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
});

const defaultValues = {
  email: '',
};

function ForgotPassword2Page() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const loaders = useSelector(({ auth }) => auth.loaders);

  function onSubmit(model) {
    const body = {
      email: model.email,
      userIdentifier: 'xxxx',
    };
    dispatch(setAuthLoader(true));
    dispatch(forgotPassword(body));
  }

  return (
    <div>
      <HeaderBar />
      {loaders.authLoader ? (
        <CircularProgress
          style={{ marginTop: '12%', marginLeft: '50%', width: 56, height: 56 }}
          color="secondary"
        />
      ) : (
        <>
          <div className="flex flex-col flex-auto  md:flex-row md:p-0 overflow-hidden">
            <SheepShareIntroSection />
            <Card
              component={motion.div}
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              transition={{ bounceDamping: 0 }}
              className="w-full max-w-500 mx-auto m-16 md:m-0 rounded-20 md:rounded-none"
              square
              layout
            >
              <CardContent className="flex flex-col items-center justify-center p-10 sm:p-10 md:p-10 md:pt-10 ">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.2 } }}
                >
                  <div className="flex items-center mb-24">
                    <img
                      className="logo-icon w-36 mr-5"
                      src="assets/images/sheepshare/face-logo.png"
                      alt=""
                    />

                    <div>
                      <Typography className="text-24 font-semibold logo-text" color="inherit">
                        RECOVER PASSWORD
                      </Typography>
                    </div>
                  </div>
                </motion.div>
                <br />
                <br />

                <form
                  name="recoverForm"
                  noValidate
                  className="flex flex-col justify-center w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        label="Email"
                        autoFocus
                        type="email"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        variant="outlined"
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
                    Send reset link
                  </Button>
                </form>

                <div className="flex flex-col items-center justify-center pt-32 pb-24">
                  <Link className="font-normal" to="/login">
                    Go back to login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          <FooterLayout1 className="sticky bottom-0" />
        </>
      )}
    </div>
  );
}

export default ForgotPassword2Page;
