import { WEB_PAGES } from '../../../../global/data';
import PublicationPage from '../publications/PublicationPage';
import LandingPage from '../landingPage/LandingPage';
import TeamPage from '../team/TeamPage';
import Achievements from '../achievementsPage/Achievements';

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
  {
    title: 'Achievements',
    path: '/achievements',
    exact: true,
    component: Achievements,
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
  const routes = availableRoutes.filter(({ title }) => WEB_PAGES.pages.includes(title.toUpperCase()));

  return [...defaultRoutes, ...routes];
};

// eslint-disable-next-line import/prefer-default-export
export { getRoutes };
