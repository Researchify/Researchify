import React from 'react';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import NetworkWifiIcon from '@material-ui/icons/NetworkWifi';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

import { theme } from '../theme';

const headerLinks = [
  {
    label: 'ABOUT',
    link: '#about',
  },
  {
    label: 'FEATURES',
    link: '#features',
  },
  {
    label: 'OUR STORY',
    link: '#company',
  },
];

const aboutDescription = {
  one: `Organize all your research projects into a single collection and share it online. Compatible with Google Scholar or manually insert your research projects,
  Researchify provides flexible options in customizing your own website.`,
  two: `No coding experience necessary. From registration to choosing your website design, to filtering which content to display in your website and having your website hosted publically,
   Researchify will ensure its users a smooth journey.`,
};

const styles = {
  icon: { fontSize: '5rem', color: theme.secondary },
};

const featuresData = [
  {
    logo: <AccountBalanceIcon style={styles.icon} />,
    title: 'Themes',
    description: 'asd123',
  },
  {
    logo: <AccountTreeIcon style={styles.icon} />,
    title: 'Social Media',
    description:
      'Compatible and integrated with Machine Learning technologies.',
  },
  {
    logo: <ShoppingCartIcon style={styles.icon} />,
    title: 'Customizable',
    description: 'lalala',
  },
  {
    logo: <MonetizationOnIcon style={styles.icon} />,
    title: 'Teams',
    description: 'lalala',
  },
  {
    logo: <NetworkWifiIcon style={styles.icon} />,
    title: 'Publications',
    description: 'Available everywhere anywhere you are.',
  },
  {
    logo: <NetworkWifiIcon style={styles.icon} />,
    title: 'Availability',
    description: 'Available everywhere anywhere you are.',
  },
];

export { featuresData, headerLinks, aboutDescription };
