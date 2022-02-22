import { ThemeProvider } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectMainTheme } from 'app/store/fuse/settingsSlice';
import { motion } from 'framer-motion';
import Fab from '@mui/material/Fab';

function MyComputerHeader(props) {
  const dispatch = useDispatch();

  const mainTheme = useSelector(selectMainTheme);
  const { t } = useTranslation('mailApp');

  return (
    <ThemeProvider theme={mainTheme}>
      <div className="flex items-center flex-1 relative">
        <motion.div animation="transition.expandIn" delay={300}>
          <Icon className="text-32">laptop_mac</Icon>
        </motion.div>
        <motion.div animation="transition.slideLeftIn" delay={300}>
          <span className="text-24 mx-16">{t('Machines')}</span>
        </motion.div>

        {/* <div className="flex items-end flex-1">
          <Fab
            component={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.6 } }}
            color="secondary"
            aria-label="add"
            className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 -mb-28 z-999"
          >
            <Icon>add</Icon>
          </Fab>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6 } }}
          >
            {selectedItem && (
              <Breadcrumb
                selected={selectedItem}
                className="flex flex-1 ltr:pl-72 rtl:pr-72 pb-12 text-16 sm:text-24 font-semibold"
              />
            )}
          </motion.div>
        </div> */}
      </div>
    </ThemeProvider>
  );
}

export default MyComputerHeader;
