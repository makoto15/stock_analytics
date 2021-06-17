import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';

fetch('/api/sector/0001/consumer-defensive').then(response => {
  console.log(response.json());
})
ReactDOM.render(<AppRouter />, document.getElementById('app'));