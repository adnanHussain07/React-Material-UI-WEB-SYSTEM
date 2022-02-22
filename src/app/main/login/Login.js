import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { showMessage } from 'app/store/fuse/messageSlice';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import { selectMainThemeDark } from 'app/store/fuse/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import FooterLayout1 from 'app/fuse-layouts/layout1/components/FooterLayout1';
import HeaderBar from 'app/fuse-layouts/shared-components/HeaderBar';
import { submitLogin } from 'app/auth/store/loginSlice';
import { setAuthLoader } from 'app/auth/store/loadersSlice';

const LoginRoot = styled('div')(({ theme }) => ({
  '& .Login3-leftSection': {},

  '& .Login3-rightSection': {
    //   background : `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
    //      theme.palette.primary.dark,
    //      0.5
    //  )} 100%)`,
    background: `linear-gradient(to top, #b1d8d90a 0%, rgb(176 196 199) 80%)`,
    color: theme.palette.primary.darken,
  },
  backgroundImage: "url('/assets/images/sheepshare/ss-graph.png')",

  backgroundSize: 'cover',
  backgroundPosition: '0 50%',
  backgroundRepeat: 'no-repeat',
}));

const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
});

const defaultValues = {
  email: '',
  password: '',
  remember: true,
};

function Login(props) {
  let { expired } = props.match.params;
  const dispatch = useDispatch();
  const mainThemeDark = useSelector(selectMainThemeDark);
  const history = useHistory();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  // useEffect(() => {
  //   if (expired) {
  //     dispatch(showMessage({ message: 'Session Expired! Kindly login again', variant: 'info' }));
  //     expired = undefined;
  //   }
  // }, []);

  const { isValid, dirtyFields, errors } = formState;
  const loaders = useSelector(({ auth }) => auth.loaders);

  function onSubmit(model) {
    const body = {
      email: model.email,
      password: model.password,
      rememberMe: model.remember,
    };
    dispatch(setAuthLoader(true));
    dispatch(submitLogin(body));
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
          <LoginRoot className="flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
            >
              <Card
                className="Login3-leftSection flex flex-col w-full max-w-sm items-center justify-center shadow-0"
                square
              >
                <CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.2 } }}
                  >
                    <div className="flex items-center mb-48">
                      <img
                        className="logo-icon w-36 mr-5"
                        src="assets/images/sheepshare/face-logo.png"
                        alt=""
                      />
                      {/* <div className="border-l-1 mr-4 w-1 h-40" /> */}
                      <div>
                        <Typography className="text-24 font-semibold logo-text" color="inherit">
                          LOGIN
                        </Typography>
                      </div>
                    </div>
                  </motion.div>

                  <form
                    name="loginForm"
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

                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
                      <Controller
                        name="remember"
                        control={control}
                        render={({ field }) => (
                          <FormControl>
                            <FormControlLabel
                              label="Remember Me"
                              control={<Checkbox {...field} />}
                            />
                          </FormControl>
                        )}
                      />

                      <Link className="font-normal" to="/pages/auth/forgot-password">
                        Forgot Password?
                      </Link>
                    </div>

                    <Button
                      variant="contained"
                      color="primary"
                      className="w-full mx-auto mt-16"
                      aria-label="LOG IN"
                      disabled={_.isEmpty(dirtyFields) || !isValid}
                      type="submit"
                    >
                      Login
                    </Button>
                  </form>
                </CardContent>

                <div className="flex flex-col items-center justify-center pb-32">
                  <span className="font-normal">Don't have an account?</span>
                  <Link className="font-normal" to="/register">
                    Create an account
                  </Link>
                </div>
              </Card>

              <div className="Login3-rightSection flex hidden md:flex flex-1 items-center justify-center p-64">
                <div className="max-w-320">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                  >
                    <div className="flex flex-1">
                      {/* <Typography
          color="inherit"
          className="text-32 sm:text-44 font-semibold leading-tight"
        > 
         Sheepshare
        </Typography> */}

                      <Button variant="contained" color="primary">
                        <Typography className="text-32 sm:text-44 font-semibold leading-tight">
                          Sheepshare
                        </Typography>
                      </Button>
                    </div>
                    <br />

                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="grey.600"
                      className="text-18 sm:text-20 font-bold"
                    >
                      Solution to all remote problems.
                    </Typography>
                  </motion.div>

                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { delay: 0.3 } }}
                    >
                      <img
                        className="logo-icon w-64 mr-10"
                        src="assets/images/sheepshare/full-logo.gif"
                        alt=""
                      />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.3 } }}
                  >
                    <Typography variant="subtitle1" color="grey.600" className="mt-32 font-medium ">
                      Most secure, controlled and advanced screen sharing software to empower
                      businesses to seamlessly control remote access.
                    </Typography>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <br />
          </LoginRoot>
          <FooterLayout1 className="sticky bottom-0" />
        </>
      )}
    </div>
  );
}

export default Login;
