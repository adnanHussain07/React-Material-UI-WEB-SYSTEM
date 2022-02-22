import { authRoles } from 'app/auth';
import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Menus',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'dashboards',
        title: 'Dashboard',
        translate: 'DASHBOARDS',
        // type: 'collapse',
        type: 'item',
        icon: 'dashboard',
        url: '/sheep/dashboards',
      },
      {
        id: 'my-computer',
        title: 'My Machines',
        translate: 'MYCOMPUTER',
        type: 'item',
        icon: 'computer',
        url: '/pages/computer',
      },
      {
        id: 'invite',
        title: 'My Invitations',
        translate: 'INVITE',
        type: 'item',
        icon: 'speaker_notes',
        url: '/pages/invites',
      },
      {
        id: 'myprofile',
        title: 'Profile',
        translate: 'PROFILE',
        type: 'item',
        icon: 'account_circle',
        url: '/pages/profile',
      },
    ],
  },
];

export default navigationConfig;
