import React from 'react';
import CompanyBasics from './CompanyShow/CompanyBasics';
import CompanyInfo from './CompanyShow/CompanyInfo';
import CompanyStatics from './CompanyShow/CompanyStatics';

const CompanyShowPage = () => (
  <div>
    <CompanyBasics />
    <div>
      <CompanyInfo />
      <CompanyStatics />
    </div>
  </div>
);

export default CompanyShowPage;