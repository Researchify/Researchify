/*

Note: The lazy loading is used to optimise production builds.
Multiple layout imports cause multiple Layout CSS file imports from each layout's respective App.js.
This will also help in reducing the size of builds, which can be useful when many more layouts are added in the future.

 */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';

import { LAYOUT_OPTION } from './global/data';

/// Decides which of the root App components of the various layouts to display.
/// This determination is based off the provided LAYOUT_OPTION environment variable.
const layoutToDisplay = () => {
  switch (LAYOUT_OPTION) {
    case 1: // TODO: there might be a better way to do this.
      // eslint-disable-next-line no-case-declarations
      const AppLayout1 = React.lazy(() => import('./layouts/layout1/App'));
      return (
        <>
          <React.Suspense fallback={<></>}>
            <AppLayout1 />
          </React.Suspense>
        </>
      );
    case 2:
      // eslint-disable-next-line no-case-declarations
      const AppLayout2 = React.lazy(() => import('./layouts/layout2/App'));
      return (
        <>
          <React.Suspense fallback={<></>}>
            <AppLayout2 />
          </React.Suspense>
        </>
      );
    case 3:
      // eslint-disable-next-line no-case-declarations
      const AppLayout3 = React.lazy(() => import('./layouts/layout3/App'));
      return (
        <>
          <React.Suspense fallback={<></>}>
            <AppLayout3 />
          </React.Suspense>
        </>
      );
    case 4:
      // eslint-disable-next-line no-case-declarations
      const AppLayout4 = React.lazy(() => import('./layouts/layout4/App'));
      return (
        <>
          <React.Suspense fallback={<></>}>
            <AppLayout4 />
          </React.Suspense>
        </>
      );

    default:
      // eslint-disable-next-line no-case-declarations
      const DefaultAppLayout = React.lazy(() => import('./layouts/layout1/App'));
      return (
        <>
          <React.Suspense fallback={<></>}>
            <DefaultAppLayout />
          </React.Suspense>
        </>
      );
  }
};

ReactDOM.render(
  <HashRouter>
    {layoutToDisplay()}
  </HashRouter>,
  document.getElementById('root'),
);
