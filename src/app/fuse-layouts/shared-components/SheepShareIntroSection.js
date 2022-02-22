import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Icon from '@mui/material/Icon';

function SheepShareIntroSection() {
  return (
    <div className="flex flex-col flex-grow-0 items-center  p-0 text-center md:p-0 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
        className="flex p-16"
      >
        <img className="w-40 h-40 mr-10 mt-8" alt="" src="assets/images/sheepshare/full-logo.gif" />
        <Typography className="text-32 sm:text-28 font-semibold leading-tight">
          Welcome to the{' '}
          <Button variant="contained" color="primary">
            <Typography className="text-32 sm:text-44 font-semibold leading-tight">
              Sheepshare
            </Typography>
          </Button>{' '}
          world.
        </Typography>

        <br />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
      >
        <Typography
          variant="subtitle1"
          color="inherit"
          className="text-28 p-16 sm:text-28 leading-tight"
        >
          Powerful and secure tool for remote control, sharing and a solution to all remote
          problems.
        </Typography>
      </motion.div>
      <br />
      <br />

      <div className="flex flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          className="w-224 h-224 p-16"
        >
          <Paper
            elevation={2}
            className="board flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg cursor-pointer"
          >
            <Icon className="text-56" color="secondary">
              groups
            </Icon>
            <Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
              Accesses
            </Typography>
          </Paper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          className="w-224 h-224 p-16"
        >
          <Paper
            className="board flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg cursor-pointer"
            role="button"
          >
            <Icon className="text-56" color="success">
              power
            </Icon>
            <Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
              Connections
            </Typography>
          </Paper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          className="w-224 h-224 p-16"
        >
          <Paper
            className="board flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg cursor-pointer"
            role="button"
          >
            <Icon className="text-56" color="error">
              text_snippet
            </Icon>
            <Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
              Shared files
            </Typography>
          </Paper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.3 } }}
          className="w-224 h-224 p-16"
        >
          <Paper
            className="board flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg cursor-pointer"
            role="button"
          >
            <Icon className="text-56" color="warning">
              phonelink
            </Icon>
            <Typography className="text-16 font-medium text-center pt-16 px-32" color="inherit">
              Devices
            </Typography>
          </Paper>
        </motion.div>
      </div>
    </div>
  );
}

export default SheepShareIntroSection;
