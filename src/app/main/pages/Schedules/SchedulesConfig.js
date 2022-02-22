import React from 'react';

const ScheduleConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: true,
        },
        footer: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: '/pages/schedules',
      component: React.lazy(() => import('./Schedules')),
    },
  ],
};

export default ScheduleConfig;
