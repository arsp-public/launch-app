import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ClientFactory from "./ClientFactory";

ReactDOM.render(<App client={ClientFactory.create()}/>, document.getElementById('root'));

