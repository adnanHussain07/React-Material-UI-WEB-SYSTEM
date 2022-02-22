import React from 'react';

const InvitesConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  // auth    : authRoles.admin,
  routes: [
    {
      path: '/pages/invites',
      component: React.lazy(() => import('./Invites')),
    },
  ],
};

export default InvitesConfig;
