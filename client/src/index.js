import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

import 'bootstrap/dist/css/bootstrap.min.css'; // for bootstrap css library

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // for the redux devtools debugger
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root'));