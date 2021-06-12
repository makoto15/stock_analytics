import React from 'react';

const CompanyBasics = (props) => (
  <div>
    <h2>{props.data.symbol}- {props.data.companyName}</h2>
    <div>
      <img src={props.data.url} />
      {props.data.close} (前日の終値)
    </div>
    <div>
      {props.data.volume}
      {props.data.high}
      {props.data.low}
    </div>
  </div>
);

export default CompanyBasics;