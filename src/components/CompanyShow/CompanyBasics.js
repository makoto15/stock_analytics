import React from 'react';

const CompanyBasics = (props) => (
  <div className="companyBasics-body w-50 m-auto mb-5">
    <h2>{props.data.symbol}- {props.data.companyName}</h2>
    <div>
      <img src={props.data.url} />
      {props.data.close} (前日の終値)
    </div>
    <div>
      <div className="d-flex justify-content-around">
        <p>始値 {props.data.open}</p>
        <p>出来高 {props.data.volume}</p>
      </div>
      <div className="d-flex justify-content-around">
        <p>高値 {props.data.high}</p>
        <p>安値 {props.data.low}</p>
      </div>
    </div>
  </div>
);

export default CompanyBasics;