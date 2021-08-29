import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';

import { LAYOUT_OPTION } from './global/data';

/*
import AppLayout1 from './layouts/layout1/App';
import AppLayout2 from './layouts/layout2/App';
import AppLayout3 from './layouts/layout3/App';
import AppLayout4 from './layouts/layout4/App';
 */



/// Decides which of the root App components of the various layouts to display.
/// This determination is based off the provided LAYOUT_OPTION environment variable.
const layoutToDisplay = () => {
  switch (LAYOUT_OPTION) {
    case 1:  // TODO: there might be a better way to do this.
      const AppLayout1 = React.lazy(() => import('./layouts/layout1/App'));
      return(
          <>
            <React.Suspense fallback={<></>}>
              <AppLayout1/>
            </React.Suspense>
          </>
          )
    case 2:
      const AppLayout2 = React.lazy(() => import('./layouts/layout2/App'));
      return(
          <>
            <React.Suspense fallback={<></>}>
              <AppLayout2/>
            </React.Suspense>
          </>
      )
    case 3:
      const AppLayout3 = React.lazy(() => import('./layouts/layout3/App'));
      return(
          <>
            <React.Suspense fallback={<></>}>
              <AppLayout3/>
            </React.Suspense>
          </>
      )
    case 4:
      const AppLayout4 = React.lazy(() => import('./layouts/layout4/App'));
      return(
          <>
            <React.Suspense fallback={<></>}>
              <AppLayout4/>
            </React.Suspense>
          </>
      )
  }
};

ReactDOM.render(
  <HashRouter>
    {layoutToDisplay()}
  </HashRouter>,
  document.getElementById('root'),
);
