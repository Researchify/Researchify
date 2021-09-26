import { BsBookHalf, BsPeopleFill } from 'react-icons/bs';
import { GiAchievement } from 'react-icons/gi';
import { AiFillHome } from 'react-icons/ai';
import { TEAM_SITE_METADATA } from '../../../../global/data';
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
    icon: <BsBookHalf />,
  },
  {
    title: 'Team',
    path: '/team',
    exact: true,
    component: TeamPage,
    icon: <BsPeopleFill />,
  },
  {
    title: 'Achievements',
    path: '/achievements',
    exact: true,
    component: Achievements,
    icon: <GiAchievement />,
  },
];

const defaultRoutes = [
  {
    title: 'Home',
    path: '/',
    exact: true,
    component: LandingPage,
    icon: <AiFillHome />,
  },
];

/**
 * Get the routes to the web pages the client wants deployed
 */
const getRoutes = () => {
  const routes = availableRoutes.filter(({ title }) => TEAM_SITE_METADATA.pages.includes(title.toUpperCase()));

  return [...defaultRoutes, ...routes];
};

export default getRoutes;
