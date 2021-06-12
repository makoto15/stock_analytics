import React from 'react';
import CompanyBasics from './CompanyShow/CompanyBasics';
import CompanyInfo from './CompanyShow/CompanyInfo';
import CompanyStatics from './CompanyShow/CompanyStatics';


// This is DummyData
// delete when ServerSide is implemented
const dummyData = {
  symbol: "AAPL",
  companyName: "Apple Inc",
  close: "128.14",
  high: "133.65",
  low: "126.85",
  volume: "54316215",
  enterpriseValue: "2162421129472",
  enterpriseValueToRevenue: "6.75",
  priceToSales: "6.63",
  week52high: "148.76",
  week52low: "82.87",
  avg10Volume: "69201876",
  avg30Volume: "75037801",
  day200MovingAvg: "129.69",
  day50MovingAVG: "129.61",
  close_previousClose_diff: "-2",
  url: "ogL..seiso3gcgop-o/noiulilgochgdlpmsaA/rpa/x/teehpgoa/l7.tt/oAsPp",
  EBITDA: "101517438673"
}

const CompanyShowPage = () => (
  <div>
    <CompanyBasics />
    <div>
      <CompanyInfo data={dummyData} />
      <CompanyStatics />
    </div>
  </div>
);

export default CompanyShowPage;