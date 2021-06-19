import React from 'react';

const CompanyCaption = (props) => (
  <div className="companyCaption-body d-flex justify-content-around">
    <div>
      <img src={props.sector.url} />
    </div>
    <div>
      <p>
        {props.sector.companyName}
      </p>
      <p>
        ティッカー: {props.sector.symbol}
      </p>
      <p>
        <span className={props.sector.close_previousClose_diff>0 ? 'text-success' : 'text-danger'}>{props.sector.close_previousClose_diff}</span> (前日比)
      </p>
    </div>
    
  </div>
)

export default CompanyCaption;