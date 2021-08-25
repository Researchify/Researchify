
import { WEB_PAGES } from '../../global/data';
import PublicationPage from '../publications/PublicationPage.js';
import LandingPage from '../landingPage/LandingPage.js';
import TeamPage from '../team/TeamPage.js';

const availableRoutes = [
  {
    title: 'Publications',
    path: '/publication',
    exact: true,
    component: PublicationPage,
  },
  {
    title: 'Team',
    path: '/team',
    exact: true,
    component: TeamPage,
  },
];

const defaultRoutes = [
  {
    title: 'Home',
    path: '/',
    exact: true,
    component: LandingPage,
  },
];

/**
 * Get the routes to the web pages the client wants deployed
 */
const getRoutes = () => {
  console.log(WEB_PAGES);
  const routes = availableRoutes.filter(({ title }) =>
    WEB_PAGES.pages.includes(title.toUpperCase())
  );

  return [...defaultRoutes, ...routes];
};

export { getRoutes };
