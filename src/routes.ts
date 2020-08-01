import login from './pages/login';
import register from './pages/register';
import forgotPassword from './pages/forgot-password';
import userHome from './pages/user-home';
import notFound from './pages/not-found';

export const authedRoutes = [
  { path: '/', exact: true, component: userHome },
  { path: '/404', exact: true, component: notFound }
];

export const unAuthedRoutes = [
  { path: '/login', exact: true, component: login },
  { path: '/register', exact: true, component: register },
  { path: '/forgot-password', exact: true, component: forgotPassword }
];
