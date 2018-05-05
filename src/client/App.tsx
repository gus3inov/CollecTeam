import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import history from './helpers/history';
import store from './redux';
import Root from './components/Root';

export interface AppProps {

}


class App extends React.Component<AppProps, {}> {
  public render() {
    return (
        <Provider store={ store }>
            <ConnectedRouter history={ history }>
                <Root />
            </ConnectedRouter>
        </Provider>
    );
  }
}

export default App;
