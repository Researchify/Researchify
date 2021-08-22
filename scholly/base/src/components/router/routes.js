
import { WEB_PAGES } from '../../global/data';
import PublicationPage from '../publications/PublicationPage.js';
import LandingPage from '../landingPage/LandingPage.js';
import TeamPageWrapper from '../team/TeamPageWrapper.js';

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
    component: TeamPageWrapper,
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
  const routes = availableRoutes.filter(({ title }) => WEB_PAGES.includes(title.toUpperCase()))

  return [...defaultRoutes, ...routes];
};

export { getRoutes };
