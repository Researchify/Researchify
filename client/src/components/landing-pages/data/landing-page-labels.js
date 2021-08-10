import React from 'react';
import ImportContacts from '@material-ui/icons/ImportContacts';
import Twitter from '@material-ui/icons/Twitter';
import Palette from '@material-ui/icons/Palette';
import Group from '@material-ui/icons/Group';
import MoneyOff from '@material-ui/icons/MoneyOff';
import GitHub from '@material-ui/icons/GitHub';

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
    logo: <ImportContacts style={styles.icon} />,
    title: 'Publication',
    description: 'Import your existing publications from Google scholar.',
  },
  {
    logo: <Twitter style={styles.icon} />,
    title: 'Social Media',
    description:
      'Update your website with real time social media feeds.',
  },
  {
    logo: <Palette style={styles.icon} />,
    title: 'Themes',
    description: 'Choose from a variety of colour and layout for your website.',
  },
  {
    logo: <Group style={styles.icon} />,
    title: 'Teams',
    description: 'Showcase the members of your organization to the community',
  },
  {
    logo: <GitHub style={styles.icon} />,
    title: 'Hosting',
    description: 'Researchify uses GitHub pages to host your website. Totally free!',
  },
  {
    logo: <MoneyOff style={styles.icon} />,
    title: 'Free',
    description: 'Researchify is a free to use service.',
  },
];

export { featuresData, headerLinks, aboutDescription };
