import React, { Component } from 'react';
import '../css/Body.css';
import Search from '../components/Search'
import SearchResultPage from '../pages/SearchResultPage'
import StationListPage from '../pages/StationListPage'
import StationDetailPage from '../pages/StationDetailPage'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

class Body extends Component {

   constructor(props){
     super(props);

     this.state = {
      bodyContent: "/",
      srchCity: "",
      srchPetrol: "",
      selectedCompanyId: "",
      selectedStation: "",
     }
   }

  handleSearchButtonClick = (search) => {
    this.setState({
      bodyContent : search.bodyContent,
      srchCity: search.srchCity,
      srchPetrol: search.srchPetrol
    });
  };

  handleCompanyNameClick = (ssearch) => {
    this.setState({
      bodyContent: ssearch.bodyContent,
      selectedCompanyId: ssearch.selectedCompanyId
    });
  };

  handleStationAddressClick = (sssearch) => {
    this.setState({
      bodyContent: sssearch.bodyContent,
      selectedStation: sssearch.selectedStation
    })
  }

  render() {
    return(
    <div id = "main-container">
          <Router >
            <Switch>
              <Route exact path='/' render={() => 
                     ( <Search onSearchButtonClick = {this.handleSearchButtonClick}/>)}/>
              <Route exact path= '/companyList' render={() => 
                     ( <SearchResultPage srchCity = {this.state.srchCity} 
                                         srchPetrol = {this.state.srchPetrol} 
                                         onCompanyNameClick = {this.handleCompanyNameClick}/>)}/>
              <Route exact path= '/stationList' render={() =>
                     ( <StationListPage selectedCompanyId = {this.state.selectedCompanyId} 
                                        onStationAddressClick = {this.handleStationAddressClick}
                                        username = {this.props.username}
                                        isAuthorized = {this.props.isAuthorized}/>)}/>
              <Route exact path= '/stationDetail' render={() => 
                     ( <StationDetailPage username = {this.props.username} 
                                          isAuthorized = {this.props.isAuthorized} 
                                          selectedStation = {this.state.selectedStation}/>)}/>
            </Switch>
          </Router>
        </div>)
    /*
     if (this.state.bodyContent === "companyList"){
      return(
        <div>
          <SearchResultPage srchCity = {this.state.srchCity} 
                            srchPetrol = {this.state.srchPetrol} 
                            onCompanyNameClick = {this.handleCompanyNameClick}></SearchResultPage>
          </div>
      )
    }
    else if (this.state.bodyContent === "stationList"){
      return(
        <div>
          <StationListPage selectedCompanyId = {this.state.selectedCompanyId} 
                           onStationAddressClick = {this.handleStationAddressClick}
                           username = {this.props.username}
                           isAuthorized = {this.props.isAuthorized}></StationListPage>
          </div>
      )
    }
    else if (this.state.bodyContent === "stationDetail"){
      return(
        <div>
          <StationDetailPage username = {this.props.username} 
                             isAuthorized = {this.props.isAuthorized} 
                             selectedStation = {this.state.selectedStation}></StationDetailPage>
          </div>
      )
    }
    else return (
      <div id = "main-container">
          <Search onSearchButtonClick = {this.handleSearchButtonClick}></Search>
      </div>
    );*/
  }
}

export default Body;
