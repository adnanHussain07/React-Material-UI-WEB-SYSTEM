import { lazy } from 'react';

const MailConfirmPageConfig = {
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
      path: '/pages/auth/mail-confirm',
      component: lazy(() => import('./MailConfirmPage')),
    },
  ],
};

export default MailConfirmPageConfig;
