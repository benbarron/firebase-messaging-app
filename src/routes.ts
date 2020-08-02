import login from './pages/login';
import register from './pages/register';
import forgotPassword from './pages/forgot-password';
import userHome from './pages/user-home';
import nonuserHome from './pages/nonuser-home';
import userProfile from './pages/user-profile';
import userSettings from './pages/user-settings';
import Groups from './pages/groups';
import GroupBoard from './pages/group-board';

export const authedRoutes = [
  { path: '/', exact: true, component: userHome },
  { path: '/groups', exact: true, component: Groups },
  { path: '/profile', exact: true, component: userProfile },
  { path: '/settings', exact: true, component: userSettings },
  { path: '/group/:id', exact: true, component: GroupBoard }
];

export const unAuthedRoutes = [
  { path: '/login', exact: true, component: login },
  { path: '/register', exact: true, component: register },
  { path: '/forgot-password', exact: true, component: forgotPassword },
  { path: '/', exact: true, component: nonuserHome }
];
