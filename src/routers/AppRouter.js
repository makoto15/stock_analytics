import React from 'react';
import NotFoundPage from '../components/NotFoundPage'
import StockDashboardPage from '../components/StockDashboardPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';


const AppRouter = () => (
  <BrowserRouter>
    <div>
    <Header />
    <Switch>
      <Route path="/" component={StockDashboardPage} exact={true}/>
      <Route component={NotFoundPage} />
    </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter