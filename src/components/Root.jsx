import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import App from './App.jsx';
import Play from './Play.jsx';

const Root = () => (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/play/:assetId?" component={Play} />
    </div>
  </Router>
);

export default hot(module)(Root);
