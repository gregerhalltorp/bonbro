import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';

let data = {
  text: 'Hej, det är kul!',
};

// setTimeout(() => {
//   console.log('alksjdflaksjdfladsjf');
//   data.text = 'woooooaoooaoooa';
// }, 1000);

function renderApp() {
  render(<App data={data} />, document.getElementById('root'));
}

renderApp();
