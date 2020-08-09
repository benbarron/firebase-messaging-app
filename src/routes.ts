/********/
import login from './pages/login';
import register from './pages/register';
import forgotPassword from './pages/forgot-password';
import nonuserHome from './pages/nonuser-home';
/********/
import userHome from './pages/user-home';
import userProfile from './pages/user-profile';
import userSettings from './pages/user-settings';
/********/
import groupsJoin from './pages/groups-join';
import groupsCreate from './pages/groups-create';
import groupsOwned from './pages/groups-owned';
import groupsMessages from './pages/groups-messages';
/********/

export const authedRoutes = [
  { path: '/', exact: true, component: userHome },
  { path: '/groups/join', exact: true, component: groupsJoin },
  { path: '/groups/owned', exact: true, component: groupsOwned },
  { path: '/groups/create', exact: true, component: groupsCreate },
  { path: '/groups/:id/messages', exact: true, component: groupsMessages },
  { path: '/profile', exact: true, component: userProfile },
  { path: '/settings', exact: true, component: userSettings }
];

export const unAuthedRoutes = [
  { path: '/login', exact: true, component: login },
  { path: '/register', exact: true, component: register },
  { path: '/forgot-password', exact: true, component: forgotPassword },
  { path: '/', exact: true, component: nonuserHome }
];
