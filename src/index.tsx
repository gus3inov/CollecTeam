import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './client/App';

ReactDOM.hydrate(
  <App />,
  document.getElementById('root') as HTMLElement
);
