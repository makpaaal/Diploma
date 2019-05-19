import React, { Component } from 'react';
import client from '../client.js'
import {Link} from 'react-router-dom';


class SearchResultPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companies: [],
      cities: [],
      city: "",
    };
  }

  handleCityChange(newCity){
    this.setState({
      city: newCity
    })
  }

  componentDidMount(){
    client.getCompanies((companies) => {
      this.setState({
        companies: companies,
        city: this.props.srchCity
      });
    });
    client.getCities((cities) => {
      this.setState({
        cities: cities
      });
    }); 
  }

  handleCompanyNameClick(selectedCompanyId){
    this.props.onCompanyNameClick({bodyContent: "/stationList", selectedCompanyId: selectedCompanyId});
  }
  getPetrols(company, gasType){
    return company['price_for_' + gasType];
  }

  render() {
    return (
      <div>
        {this.state.companies.map((company) =>
        <div>
        {(company.city === this.state.city)
        ? <div>
          {console.log(company)}
            <Link to = '/stationList' onClick = {this.handleCompanyNameClick.bind(this, company.company_id)}>{company.company_name}</Link>
            <h3>{this.getPetrols(company, this.props.srchPetrol)}</h3>
        </div>
        : null
        }
        </div>
        )}
        <div>
        <h2>Other cities:</h2>
        {this.state.cities.map((city) =>
        <div>
          <h4 onClick = {() => this.handleCityChange(city.city_name)}>{city.city_name}</h4>
        </div>
        )}
        </div>
      </div>
    );
  }
}

export default SearchResultPage;

//<h1 onClick = {this.handleCompanyNameClick.bind(this, company.company_id)}>{company.company_name}</h1>
