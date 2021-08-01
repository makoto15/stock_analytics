import React from 'react';
import axios from 'axios';
import SectorRankingSymbolsBlock from './SectorRankingSymbolsBlock';

export default class SectorRankingSymbols extends React.Component{
  constructor(props) {
    super(props);
    this.getSectorTop5Symbols = this.getSectorTop5Symbols.bind(this);
    this.state = {
      sectorRankings: []
    }
  }

  componentDidMount() {
    this.getSectorTop5Symbols();
  }


  async getSectorTop5Symbols() {
    const res = await axios.get('/api/sector/symbol/ranking/5');
    const sectorRankings = JSON.parse(res.data);
    this.setState(() => ({
      sectorRankings
    }))
  }

  render() {
    return (
      <div className="sectorAttention-body">
        <div className="sectorAttention-blocks d-flex">
          {
            this.state.sectorRankings.map((sector) => <SectorRankingSymbolsBlock sector={sector} key={sector.sector_name} />)
          }
        </div>
      </div>
    );
  }
}

