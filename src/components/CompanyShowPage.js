import React from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import CompanyBasics from './CompanyShow/CompanyBasics';
import CompanyInfo from './CompanyShow/CompanyInfo';
import CompanyStatics from './CompanyShow/CompanyStatics';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export default class CompanyShowPage extends React.Component {
  constructor(props){
    super(props);
    this.getCompanyInfo = this.getCompanyInfo.bind(this);
    this.getGraphData = this.getGraphData.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.a11yProps = this.a11yProps.bind(this);
    this.state = {
      ranges: ['5d','1m','3m','1y','5y'],
      companyInfo: {},
      labels: [],
      dataClose: [],
      data: {}
    }
  };

  componentDidMount() {
    this.getCompanyInfo();
    this.getCompanyGraphInfo('5d');
  }

  

  async getCompanyInfo(){
    const res = await axios.get(`/api/symbol/${this.props.match.params.symbol}`);
    const companyInfo = JSON.parse(res.data);
    this.setState(() => ({
      companyInfo
    }));
  };

  async getCompanyGraphInfo(range) {
    const res = await axios.get(`/api/symbol/basic-chart/${this.props.match.params.symbol}/${range}`);
    const companyGraphInfo = JSON.parse(res.data);
    this.setState(() => ({
      labels: companyGraphInfo['label'],
      dataClose: companyGraphInfo['close'],
      data: companyGraphInfo['data']
    }));
  }

  getGraphData() {
    return {
      labels: this.state.labels,
      datasets: [
        {
          data: this.state.dataClose,
          borderColor: '#274059',
          color: '#274059',
          label: '1y'

        }
      ]
    }
  }

  handleChangeTab = (event, newValue) => {
    this.getCompanyGraphInfo(this.state['ranges'][newValue]);
  };

  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


  render() {
    let value = 0;
    const data = this.state['data']
    const options =  {
      plugins: {
          tooltip: {
              callbacks: {
                  label: function(context) {
                      const hoveredData = data[context['label']];
                      const msg = [
                        `Price: ${hoveredData['close']}`,
                        `Change: ${hoveredData['change']}`,
                        `% Change: ${hoveredData['changePercent']}`,
                        `Volume: ${hoveredData['volume']}`
                      ]
                      return msg;
                  },
              }
          }
      }
  }
    return (
      <div className="companyShowPage-body p-5">
        <CompanyBasics data={this.state.companyInfo} />
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChangeTab} aria-label="simple tabs example">
            {this.state.ranges.map((range) => <Tab label={range} {...this.a11yProps(range)} key={range} /> )}
          </Tabs>
      </AppBar>
        <Line data={this.getGraphData()} options={options} />
        <div>
          <CompanyInfo data={this.state.companyInfo} />
          <CompanyStatics data={this.state.companyInfo} />
        </div>
      </div>
    )
  };
}
