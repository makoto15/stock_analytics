import React from 'react';
import NotFoundPage from '../components/NotFoundPage'
import StockDashboardPage from '../components/StockDashboardPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={StockDashboardPage} exact={true}/>
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter