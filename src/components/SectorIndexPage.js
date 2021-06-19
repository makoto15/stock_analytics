import React from 'react';
import axios from 'axios';
import CompanyCaption from './CompanyShow/CompanyCaption';


export default class SectorIndexPage extends React.Component {
  constructor(props){
    super(props);
    this.getSectorInfo = this.getSectorInfo.bind(this);
    this.state = {
      sectorName: "",
      sectorList: []
    };
  }

  componentDidMount() {
    this.getSectorInfo();
  }

  async getSectorInfo() {
    const res = await axios.get(`/api/sector/${this.props.match.params.sectorId}/${this.props.match.params.sector}`);
    const companyInfo = JSON.parse(res.data);
    this.setState(() => ({
      sectorName: companyInfo.sector,
      sectorList: companyInfo.symbols
    }))
  }

  render() {
    return (
      <div className="sectorIndexPage-body p-5">
        <h1> {this.state.sectorName} セクター米国株グロース銘柄10株</h1>
        {
          this.state.sectorList.map((sector) => {
            return <CompanyCaption sector={sector} key={sector.companyName} />
          })
        }
      </div>
    )
  }
};