import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import {REPO_NAME} from './global/data';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';

import App from "./components/App";


ReactDOM.render(
    <HashRouter basename={process.env.PUBLIC_URL}>
        <App />
    </HashRouter>,
    document.getElementById('root')
);