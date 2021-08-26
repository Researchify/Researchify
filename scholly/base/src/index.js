import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';

import { LAYOUT_OPTION } from './global/data';

import AppLayout1 from './layouts/layout1/App';
import AppLayout2 from './layouts/layout2/App';
import AppLayout3 from './layouts/layout3/App';
import AppLayout4 from './layouts/layout4/App';

/// Decides which of the root App components of the various layouts to display.
/// This determination is based off the provided LAYOUT_OPTION environment variable.
const layoutToDisplay = () => {
  switch (LAYOUT_OPTION) {
    case 1:  // TODO: there might be a better way to do this.
      return <AppLayout1/>;
    case 2:
      return <AppLayout2/>;
    case 3:
      return <AppLayout3/>;
    case 4:
      return <AppLayout4/>;
  }
};

ReactDOM.render(
  <HashRouter>
    {layoutToDisplay()}
  </HashRouter>,
  document.getElementById('root'),
);
