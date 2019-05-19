import React, { Component } from 'react';
import client from '../client.js'
import ReviewForm from '../components/ReviewForm'

class StationDetailPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stations: [],
      reviews: []
    };

    this.handleUpdatePage = this.handleUpdatePage.bind(this);
  }

  componentDidMount(){
    client.getStations((stations) => {
      this.setState({
        stations: stations
      });
    });
    client.getReviews((reviews) => {
        this.setState({
          reviews: reviews
        });
      });
      if (this.props.isAuthorized) this.setState({username: this.props.username})
      else this.setState({username: "Anonymous"})
  }

  handleUpdatePage(){
    this.forceUpdate();
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
        {this.state.stations.map((station) =>
        <div>
        {(station.address === this.props.selectedStation)
        ? <div>
            <h1>{station.address}</h1>  
            <h3>{this.calcRating(station.address)}</h3>
            { (station.has_market)
            ? <h3>Has market</h3>  
            : null}
            {(station.has_atm)
            ? <h3>Has atm</h3> 
            : null}
            {(station.has_wc)
            ? <h3>Has wc</h3>  
            : null
            }{(station.has_cafe)
            ? <h3>Has cafe</h3>   
            : null
            }{
            (station.has_carwash)
            ? <h3>Has carwash</h3>   
            : null
            }{
            (station.has_cto)
            ? <h3>Has cto</h3> 
            : null
            }  
        </div>
        : null
        }
        </div>
        )}
        Reviews:
        {this.state.reviews.map((review) =>
        <div> 
            {(review.station === this.props.selectedStation)
            ? <div><h3>{review.author}</h3><h4>{review.content}</h4></div>
            : null}
        </div>
        )}
        <ReviewForm username = {this.props.username} isAuthorized = {this.props.isAuthorized} station = {this.props.selectedStation} updatePage = {this.handleUpdatePage}></ReviewForm>
      </div>
    );
  }
}

export default StationDetailPage;
