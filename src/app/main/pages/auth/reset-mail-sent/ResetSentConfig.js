import { lazy } from 'react';

const ResetSentConfig = {
  settings: {
    layout: {
      // config: {},
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: '/pages/auth/reset-sent',
      component: lazy(() => import('./ResetSentPage')),
    },
  ],
};

export default ResetSentConfig;
