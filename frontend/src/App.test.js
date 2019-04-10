import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ClientFactory from "./ClientFactory";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App client={ClientFactory.create()}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
