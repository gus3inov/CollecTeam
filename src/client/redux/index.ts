import {applyMiddleware, createStore} from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import history from '../helpers/history';
import reducer from './reducer';

const enhancer = applyMiddleware(routerMiddleware(history), thunk);

const store = createStore(reducer, enhancer);

export default store
