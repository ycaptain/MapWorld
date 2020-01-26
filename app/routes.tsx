import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './containers/App';
import HomePage from './containers/HomePage';

export default () => {
  return (
    <App>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </App>
  )
};
