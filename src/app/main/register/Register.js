import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import HeaderBar from 'app/fuse-layouts/shared-components/HeaderBar';
import SheepShareIntroSection from 'app/fuse-layouts/shared-components/SheepShareIntroSection';
import FooterLayout1 from 'app/fuse-layouts/layout1/components/FooterLayout1';
import { useDispatch, useSelector } from 'react-redux';
import { submitRegister } from 'app/auth/store/registerSlice';
import { setAuthLoader } from 'app/auth/store/loadersSlice';

const Root = styled('div')(({ theme }) => ({
  backgroundImage: "url('/assets/images/sheepshare/ss-graph.png')",

  backgroundSize: 'cover',
  backgroundPosition: '0 50%',
  backgroundRepeat: 'no-repeat',
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  firstName: yup.string().required('You must enter your first name'),
  lastName: yup.string().required('You must enter your last name'),
  displayName: yup
    .string()
    .required('You must enter your display name')
    .min(5, 'Display Name is too short - should be 5 chars minimum.')
    .max(12, 'Display Name is too long - should be 12 chars maximum.'),
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});

const defaultValues = {
  firstName: '',
  lastName: '',
  displayName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  acceptTermsConditions: false,
};

function Register() {
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
      friendlyName: model.displayName,
      firstName: model.firstName,
      lastName: model.lastName,
      password: model.password,
      confirmPassword: model.passwordConfirm,
    };
    dispatch(setAuthLoader(true));
    dispatch(submitRegister(body));
    // history.push({
    //   pathname: '/pages/auth/mail-confirm',
    // });
    // reset(defaultValues);
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
          <Root>
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
                          REGISTER
                        </Typography>
                      </div>
                    </div>
                  </motion.div>

                  <Typography variant="h6" className="mb-24 font-semibold text-18 sm:text-18">
                    Create an account
                  </Typography>

                  <form
                    name="registerForm"
                    noValidate
                    className="flex flex-col justify-center w-full"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-16"
                          label="First Name"
                          autoFocus
                          type="name"
                          error={!!errors.firstName}
                          helperText={errors?.firstName?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-16"
                          label="Last Name"
                          type="name"
                          error={!!errors.lastName}
                          helperText={errors?.lastName?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="displayName"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-16"
                          label="Display Name"
                          type="name"
                          error={!!errors.displayName}
                          helperText={errors?.displayName?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-16"
                          label="Email"
                          type="email"
                          error={!!errors.email}
                          helperText={errors?.email?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-16"
                          label="Password"
                          type="password"
                          error={!!errors.password}
                          helperText={errors?.password?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="passwordConfirm"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-16"
                          label="Password (Confirm)"
                          type="password"
                          error={!!errors.passwordConfirm}
                          helperText={errors?.passwordConfirm?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="acceptTermsConditions"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          className="items-center"
                          error={!!errors.acceptTermsConditions}
                        >
                          <FormControlLabel
                            label="I read and accept terms and conditions"
                            control={<Checkbox {...field} />}
                          />
                          <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                        </FormControl>
                      )}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      className="w-full mx-auto mt-16"
                      aria-label="Register"
                      disabled={_.isEmpty(dirtyFields) || !isValid}
                      type="submit"
                    >
                      Create an account
                    </Button>
                  </form>

                  <div className="flex flex-col items-center justify-center pt-32 pb-24">
                    <span className="font-normal">Already have an account?</span>
                    <Link className="font-normal" to="/login">
                      Login
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Root>

          <FooterLayout1 className="sticky bottom-0" />
        </>
      )}
    </div>
  );
}

export default Register;
