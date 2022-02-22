import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useHistory, useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import HeaderBar from 'app/fuse-layouts/shared-components/HeaderBar';
import SheepShareIntroSection from 'app/fuse-layouts/shared-components/SheepShareIntroSection';
import { useEffect, useState } from 'react';
import { forgotResetPass } from 'app/auth/store/loginSlice';
import { setAuthLoader } from 'app/auth/store/loadersSlice';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup.string().email('You must enter a valid email').required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const defaultValues = {
  email: '',
  password: '',
  passwordConfirm: '',
};

function ResetPasswordPage(props) {
  const { token } = props.match.params;
  const history = useHistory();
  const dispatch = useDispatch();
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;
  const [getCode, setCode] = useState('');
  // const [searchParams, setSearchParams] = useSearchParams();
  // const asd = searchParams.get('token');
  const loaders = useSelector(({ auth }) => auth.loaders);

  useEffect(() => {
    // const qwe = new URLSearchParams(window.location.search).get('token');
    // const urlParams = new URLSearchParams(window.location.search);
    // const myParam = decodeURI(urlParams.get('token'));
    // const urlSearchParams = new URLSearchParams(window.location.search);
    // const params = Object.fromEntries(urlSearchParams.entries());
    // let url = window.location.href.split('/');
    const url = window.location.href.split('&token=')[1];
    setCode(url);
  }, []);

  function onSubmit(model) {
    const body = {
      email: model.email,
      password: model.password,
      confirmPassword: model.passwordConfirm,
      code: getCode,
    };
    dispatch(setAuthLoader(true));
    dispatch(forgotResetPass(body));
    reset(defaultValues);
  }

  return (
    <div>
      <HeaderBar />
      <div className="flex flex-col flex-auto  md:flex-row md:p-0 overflow-hidden">
        {loaders.authLoader ? (
          <CircularProgress
            style={{ marginTop: '12%', marginLeft: '50%', width: 56, height: 56 }}
            color="secondary"
          />
        ) : (
          <>
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
                        Reset Password
                      </Typography>
                    </div>
                  </div>
                </motion.div>

                <form
                  name="resetForm"
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
                        name="password"
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

                  <Button
                    variant="contained"
                    color="primary"
                    className="w-224 mx-auto mt-16"
                    aria-label="Reset"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    type="submit"
                  >
                    Reset my password
                  </Button>
                </form>

                <div className="flex flex-col items-center justify-center pt-32 pb-24">
                  <Link className="font-normal" to="/login">
                    Go back to login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

export default ResetPasswordPage;

// import { motion } from 'framer-motion';
// import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import { Link } from 'react-router-dom';
// import * as yup from 'yup';
// import _ from '@lodash';

// /**
//  * Form Validation Schema
//  */
// const schema = yup.object().shape({
//   email: yup.string().email('You must enter a valid email').required('You must enter a email'),
//   password: yup
//     .string()
//     .required('Please enter your password.')
//     .min(8, 'Password is too short - should be 8 chars minimum.'),
//   passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
// });

// const defaultValues = {
//   email: '',
//   password: '',
//   passwordConfirm: '',
// };

// function ResetPasswordPage() {
//   const { control, formState, handleSubmit, reset } = useForm({
//     mode: 'onChange',
//     defaultValues,
//     resolver: yupResolver(schema),
//   });

//   const { isValid, dirtyFields, errors } = formState;

//   function onSubmit() {
//     reset(defaultValues);
//   }

//   return (
//     <div className="flex flex-col flex-auto items-center justify-center p-16 sm:p-32">
//       <div className="flex flex-col items-center justify-center w-full">
//         <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
//           <Card className="w-full max-w-384">
//             <CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
//               <img className="w-128 m-32" src="assets/images/logos/sheepshare.png" alt="logo" />

//               <Typography variant="h6" className="mt-16 mb-24 font-semibold text-18 sm:text-24">
//                 Reset your password
//               </Typography>

//               <form
//                 name="resetForm"
//                 noValidate
//                 className="flex flex-col justify-center w-full"
//                 onSubmit={handleSubmit(onSubmit)}
//               >
//                 <Controller
//                   name="email"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       className="mb-16"
//                       label="Email"
//                       autoFocus
//                       type="email"
//                       error={!!errors.email}
//                       helperText={errors?.email?.message}
//                       variant="outlined"
//                       required
//                       fullWidth
//                     />
//                   )}
//                 />
//                 <Controller
//                   name="password"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       className="mb-16"
//                       label="Password"
//                       type="password"
//                       name="password"
//                       error={!!errors.password}
//                       helperText={errors?.password?.message}
//                       variant="outlined"
//                       required
//                       fullWidth
//                     />
//                   )}
//                 />

//                 <Controller
//                   name="passwordConfirm"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       className="mb-16"
//                       label="Password (Confirm)"
//                       type="password"
//                       error={!!errors.passwordConfirm}
//                       helperText={errors?.passwordConfirm?.message}
//                       variant="outlined"
//                       required
//                       fullWidth
//                     />
//                   )}
//                 />

//                 <Button
//                   variant="contained"
//                   color="primary"
//                   className="w-224 mx-auto mt-16"
//                   aria-label="Reset"
//                   disabled={_.isEmpty(dirtyFields) || !isValid}
//                   type="submit"
//                 >
//                   Reset my password
//                 </Button>
//               </form>

//               <div className="flex flex-col items-center justify-center pt-32 pb-24">
//                 <Link className="font-normal" to="/login">
//                   Go back to login
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default ResetPasswordPage;
