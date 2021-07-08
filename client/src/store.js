import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // for the redux devtools debugger
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
export default store;
