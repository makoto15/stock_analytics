import React from 'react';

const CompanyInfo = (props) => (
  <div className="companyInfo-body w-50 m-auto">
    <h3 className="companyInfo-title">株価情報</h3>
    <div>
      <p>52週高値: {props.data.week52high}</p>
      <p>52週安値: {props.data.week52low}</p>
      <p>200日平均: {props.data.day200MovingAvg}</p>
      <p>50日平均: {props.data.day50MovingAvg}</p>
      <p>出来高10日平均: {props.data.avg10Volume}</p>
      <p>出来高30日平均: {props.data.avg30Volume}</p>
    </div>
  </div>
);

export default CompanyInfo;