import React, { Component } from 'react';
import Body from '../components/Body'
import Footer from '../components/Footer'
import AdvertLine from '../components/AdvertLine'

class HomePage extends Component {
  render() {
    return (
        <div>
        <AdvertLine></AdvertLine>
        <Body username = {this.props.username} isAuthorized = {this.props.isAuthorized}></Body>
        <Footer></Footer>
        </div>
    );
  }
}

export default HomePage;
