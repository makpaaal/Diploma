import React, { Component } from 'react';
import client from '../client.js'
import {Link} from 'react-router-dom';

class StationListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stations: [],
      companies: [],
      reviews: [],
    };
  }

  componentDidMount(){
    client.getStations((stations) => {
      this.setState({
        stations: stations
      });
    });
    client.getCompanies((companies) => {
        this.setState({
            companies: companies
        })
    });
    client.getReviews((reviews) => {
      this.setState({
          reviews: reviews
      })
  });
  }

  handleStationAddressClick(selectedStation){
    this.props.onStationAddressClick({bodyContent: "/stationDetail", selectedStation: selectedStation});
  }

  

  calcRating(station){
    var total = 0;
    var cnt = 0;
    this.state.reviews.map((review) =>
      {if(review.station === station){
        total += review.mark;
        cnt++;
      }}
    )
  return total/cnt;
  }

  render() {
    return (
      <div>
        { this.state.companies.map((company) => 
        <div> 
        {(company.company_id === this.props.selectedCompanyId)
        ? <div>
            <h1>{company.company_name}</h1>
            <h3>AI-92: {company.price_for_92}</h3>
            <h3>AI-95: {company.price_for_95}</h3>
            <h3>AI-98: {company.price_for_98}</h3>
            <h3>DP: {company.price_for_dt}</h3>
          </div>
        : null
        }
        </div>
        )}
        
        {this.state.stations.map((station) =>
        <div>
        {(station.company_id === this.props.selectedCompanyId)
        ? <div >
            <Link to = '/stationDetail' onClick = {this.handleStationAddressClick.bind(this, station.address)}>{station.address}</Link>
            
            <h3>{this.calcRating(station.address)}</h3>   
        </div>
        : null
        }
        </div>
        )}
      </div>
    );
  }
}

export default StationListPage;


//<div onClick = {this.handleStationAddressClick.bind(this, station.address)}>
//<h1>{station.address}</h1>  
