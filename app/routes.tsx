import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './containers/App';
import HomePage from './containers/HomePage';
import RendererPage from './containers/Renderer/RendererPage';

export default () => {
  return (
    <App>
      <Switch>
        <Route path="/renderer" component={RendererPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </App>
  )
};
