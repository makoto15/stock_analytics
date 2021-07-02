import React from 'react';
import axios from 'axios';
import SectorBlock from './SectorBlock';

export default class SectorAttention extends React.Component{
  constructor(props) {
    super(props);
    this.getSectorRecommends = this.getSectorRecommends.bind(this);
    this.state = {
      sectorRecommends: []
    }
  }

  componentDidMount() {
    this.getSectorRecommends();
  }


  async getSectorRecommends() {
    const res = await axios.get('/api/sector/recommends');
    const sectorRecommends = JSON.parse(res.data);
    this.setState(() => ({
      sectorRecommends
    }))
  }

  render() {
    return (
      <div className="sectorAttention-body">
        <h2>その他注目のセクター</h2>
        <div className="sectorAttention-blocks d-flex">
          {
            this.state.sectorRecommends.map((sector) => <SectorBlock sector={sector} key={sector.sector_name} />)
          }
        </div>
      </div>
    );
  }
}

