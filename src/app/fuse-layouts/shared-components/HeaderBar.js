 
import { motion } from 'framer-motion';
import { styled, ThemeProvider,darken } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectMainThemeDark } from 'app/store/fuse/settingsSlice';


const Root = styled('div')(({ theme }) => ({
  backgroundImage: "linear-gradient(to top,  rgb(241 241 241 / 0%), rgb(173 205 205 / 32%)), url(/assets/images/sheepshare/header-bar.svg)",
backgroundColor: '#f6f7f9',
color: '#FFFFFF',
backgroundSize: 'contain',
// backgroundPosition: '0 50%',
backgroundRepeat: 'no-repeat',
}));

function HeaderBar() {
  const mainThemeDark = useSelector(selectMainThemeDark);
  return (
<ThemeProvider theme={mainThemeDark}>
      <Root>
      <div className="flex flex-1 flex-col items-center justify-between z-10 container">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <div className="flex items-center my-16 sm:mb-0">
            <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
        >
          <img className="mt-28" src="assets/images/logos/sheepshare.png" alt="logo" />
        </motion.div>
          </div>
          </div>
          </div>
      </Root>
    
</ThemeProvider>
  );
}

export default HeaderBar;
