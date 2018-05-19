import * as React from 'react';
import Root from './components/Root';

export interface AppProps {

}

class App extends React.Component<AppProps, {}> {
  public render() {
    return (
          <Root />
    );
  }
}

export default App;
