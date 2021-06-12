import React from 'react';

const CompanyStatics = (props) => (
  <div className="companyStatics-body">
    <h3 className="companyStatics-title">Statics</h3>
    <div>
      <p>企業価値: {props.data.enterpriseValue}</p>
      <p>p/s: {props.data.priceToSales}</p>
      <p>売り上げ倍率 (EV/売上高): {props.data.enterpriseValueToRevenue}</p>
      <p>EBITA: {props.data.EBITDA}</p>
    </div>
  </div>
);

export default CompanyStatics;