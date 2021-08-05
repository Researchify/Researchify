import React, {Fragment} from 'react';
import PublicationPage from './publications/PublicationPage.js';
import LandingPage from './landingPage/LandingPage.js';
import Header from './layout/Header.js';

const App = () => {
  return (
    <Fragment>
      <Header />
      <LandingPage />
      <PublicationPage />
    </Fragment>
  );
};

export default App;
