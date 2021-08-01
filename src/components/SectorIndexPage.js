import React from 'react';
import axios from 'axios';
import CompanyCaption from './CompanyShow/CompanyCaption';
import SectorAttention from './Sectors/SectorAttention';


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

  componentDidUpdate(prevProps) {
    if (this.props.match.params.sectorId !== prevProps.match.params.sectorId) {
      this.getSectorInfo();
    }
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
      <div className="sectorIndexPage-body p-5 text-center">
        <h1> {this.state.sectorName} セクター米国株グロース銘柄10株</h1>
        <SectorAttention />
        {
          this.state.sectorList.map((sector) => {
            return <CompanyCaption sector={sector} key={sector.companyName} />
          })
        }
      </div>
    )
  }
};