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

const GartnerLink = () => {
  return <a href="gartner.com/en">Gartner</a>;
};

const aboutDescription = {
  one: ` Enterprise Business Capabilities (EBC) is considered by ${(
    <GartnerLink />
  )}
  research team to be the fourth era of ERP. By implementing machine
  learning (ML), artificial intelligence (AI) and Internet of Things
  (IoT), EBC extends the capabilities of ERP into a more developed,
  effective format that meets the needs of modern businesses and their
  customers. Similar to ERP, EBC is a business process management
  software that allows businesses to collect, manage, and interpret
  data from its everyday business activities. It integrates the
  company's sales, financials (accounting), supply chains (delivery
  and warehousing), and operations (human resource activities and
  CRM), etc. thus helping your company grow.`,
  two: `  As the current business world evolves rapidly, many businesses are
  challenged to adapt and change their system to keep up with the
  current environment. In order to survive, they need to utilize the
  power of IT to stay competitive and be customer-oriented. This is
  where EBC comes in. EBC's main purpose is to help enterprises across
  industries to enhance their competitiveness as it provides a tightly
  integrated solution to the organisation’s information system needs.
  With current advancements in the technology and business world, EBC
  has the potential to bring all your business processes together to
  improve your business’s insight, enhance collaboration, increase
  efficiency and productivity, and reduce risks.`,
};

const styles = {
  icon: { fontSize: '5rem', color: theme.secondary },
};

const featuresData = [
  {
    logo: <AccountBalanceIcon style={styles.icon} />,
    title: 'Accountable',
    description: 'asd123',
  },
  {
    logo: <AccountTreeIcon style={styles.icon} />,
    title: 'Integrated',
    description:
      'Compatible and integrated with Machine Learning technologies.',
  },
  {
    logo: <ShoppingCartIcon style={styles.icon} />,
    title: 'Shoppable',
    description: 'lalala',
  },
  {
    logo: <MonetizationOnIcon style={styles.icon} />,
    title: 'Valuable',
    description: 'lalala',
  },
  {
    logo: <NetworkWifiIcon style={styles.icon} />,
    title: 'Availability',
    description: 'Available everywhere anywhere you are.',
  },
  {
    logo: <NetworkWifiIcon style={styles.icon} />,
    title: 'Availability',
    description: 'Available everywhere anywhere you are.',
  },
];

export { featuresData, headerLinks, aboutDescription };
