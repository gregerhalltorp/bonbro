import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

function renderApp() {
  render(<App />, document.getElementById('root'));
}

renderApp();
