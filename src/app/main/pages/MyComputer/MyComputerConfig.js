import React from 'react';

const MyComputerConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth    : authRoles.admin,
  routes: [
    {
      path: '/pages/computer/:isother?',
      component: React.lazy(() => import('./MyComputer')),
    },
  ],
};

export default MyComputerConfig;
