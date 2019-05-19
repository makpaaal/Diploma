import React, { Component } from 'react';
import client from '../client.js'

class AboutUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      members: [],
    };
  }

  componentDidMount(){
    client.getMembers((members) => {
      this.setState({
        members: members
      });
    });
  }

  render() {
    return (
      <div>
          {
            this.state.members.map((member) =>
            <div>
                <h2>{member.member_first_name}</h2>
                <h2>{member.member_second_name}</h2>
                <h3>{member.position}</h3>
            </div>
            )
          }
      </div>
    );
  }
}

export default AboutUs;
