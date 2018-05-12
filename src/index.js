import React from 'react';
import { render } from 'react-dom';
import Root from './components/Root.jsx';

function renderApp() {
  render(<Root />, document.getElementById('root'));
}

renderApp();
