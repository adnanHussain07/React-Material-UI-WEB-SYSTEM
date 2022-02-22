import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectWidgets } from './store/widgetsSlice';
import WidgetNow from './widgets/WidgetNow';
import WidgetWeather from './widgets/WidgetWeather';

const weather = {
  id: 'weatherWidget',
  locations: {
    NewYork: {
      name: 'New York',
      icon: 'rainy2',
      temp: {
        C: '22',
        F: '72',
      },
      windSpeed: {
        KMH: 12,
        MPH: 7.5,
      },
      windDirection: 'NW',
      rainProbability: '98%',
      next5Days: [
        {
          name: 'Sunday',
          icon: 'rainy',
          temp: {
            C: '21',
            F: '70',
          },
        },
        {
          name: 'Monday',
          icon: 'cloudy',
          temp: {
            C: '19',
            F: '66',
          },
        },
        {
          name: 'Tuesday',
          icon: 'windy3',
          temp: {
            C: '24',
            F: '75',
          },
        },
        {
          name: 'Wednesday',
          icon: 'rainy',
          temp: {
            C: '21',
            F: '70',
          },
        },
        {
          name: 'Thursday',
          icon: 'rainy2',
          temp: {
            C: '24',
            F: '75',
          },
        },
      ],
    },
  },
  currentLocation: 'NewYork',
  tempUnit: 'C',
  speedUnit: 'KMH',
};

function ProjectDashboardAppSidebar() {
  // const widgets = useSelector(selectWidgets);

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div className="w-full" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="widget flex w-full p-12">
        <WidgetNow />
      </motion.div>
      <motion.div variants={item} className="widget flex w-full p-12">
        {/* <WidgetWeather widget={weather} /> */}
      </motion.div>
    </motion.div>
  );
}

export default ProjectDashboardAppSidebar;
