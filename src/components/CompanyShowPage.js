import React from 'react';
import axios from 'axios';
import CompanyBasics from './CompanyShow/CompanyBasics';
import CompanyInfo from './CompanyShow/CompanyInfo';
import CompanyStatics from './CompanyShow/CompanyStatics';


export default class CompanyShowPage extends React.Component {
  constructor(props){
    super(props);
    this.getCompanyInfo = this.getCompanyInfo.bind(this);
    this.state = {
      companyInfo: {}
    }
  };

  componentDidMount() {
    this.getCompanyInfo();
  }

  

  async getCompanyInfo(){
    const res = await axios.get(`/api/symbol/${this.props.match.params.symbol}`);
    const companyInfo = JSON.parse(res.data);
    this.setState(() => ({
      companyInfo
    }));
  };


  render() {
    return (
      <div>
        <CompanyBasics />
        <div>
          <CompanyInfo data={this.state.companyInfo} />
          <CompanyStatics />
        </div>
      </div>
    )
  };
}
