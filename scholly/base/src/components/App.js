import React, {Fragment} from 'react';
import PublicationPage from './publications/PublicationPage.js';
import LandingPage from './landingPage/LandingPage.js';

const App = () => {
  return (
    <Fragment>
      <LandingPage />
      <PublicationPage />
    </Fragment>
  );
};

export default App;
