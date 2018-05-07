import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './client/App';
import {ConnectedRouter} from 'react-router-redux';
import {Provider} from 'react-redux';
import history from './client/helpers/history';
import store from './client/redux';
import {BrowserRouter} from 'react-router-dom'

ReactDOM.hydrate(
    <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
