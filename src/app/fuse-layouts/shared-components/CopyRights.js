import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { motion } from 'framer-motion';

function CopyRights() {
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
    <motion.div variants={container} initial="hidden" animate="show" className="flex items-center">
      <Tooltip title="sheepshare" placement="top">
        <IconButton
          className="w-48 h-48 px-4"
          color="secondary"
          component={motion.a}
          href="https://www.sheepshare.com/"
          target="_blank"
          rel="noreferrer noopener"
          role="button"
          size="large"
        >
          <img src="/assets/images/sheepshare/logo.png" alt="sheepshare" />
        </IconButton>
      </Tooltip>
      <div className="">
        {`© Copyright ${new Date().getFullYear()} - `}
        <a href="https://www.sheepshare.com/" target="_blank" rel="noreferrer">
          SheepShare Corporate.
        </a>
      </div>
    </motion.div>
  );
}

export default CopyRights;
