import { lazy } from 'react';

const ForgotPasswordPageConfig = {
  settings: {
    layout: {
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
      path: '/pages/auth/forgot-password',
      component: lazy(() => import('./ForgotPasswordPage')),
    },
  ],
};

export default ForgotPasswordPageConfig;
