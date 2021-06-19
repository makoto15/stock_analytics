import React from 'react';
import NotFoundPage from '../components/NotFoundPage'
import StockDashboardPage from '../components/StockDashboardPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import CompanyShowPage from '../components/CompanyShowPage';
import SectorIndexPage from '../components/SectorIndexPage';


const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={StockDashboardPage} exact={true}/>
        <Route path="/symbol/:symbol" component={CompanyShowPage}/>
        <Route path="/:sector/:sectorId" component={SectorIndexPage}/>
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;