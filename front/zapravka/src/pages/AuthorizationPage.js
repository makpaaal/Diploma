import React, { Component } from 'react';
import LoginForm from '../components/LoginForm'
import RegistrationForm from '../components/RegistrationForm'

class AuthorizationPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoginFormOpened: true,
    }
  }

  handleLogRegisterButtonClick = () => {
    this.setState({
      isLoginFormOpened: false,
    })
  }

  handleRegLoginButtonClick = () => {
    this.setState({
      isLoginFormOpened:true,
    })
  }

  handleAuthorization = (authdata) =>{
    this.props.onAuthorization(authdata)
  }

  render() {
    return (
      <div>
       {(this.state.isLoginFormOpened)
      ? <LoginForm onLogRegisterButtonClick = {this.handleLogRegisterButtonClick}
                   onLoginButtonClick = {this.handleAuthorization}></LoginForm>
      : <RegistrationForm onRegLoginButtonClick = {this.handleRegLoginButtonClick} 
                          onRegisterButtonClick = {this.handleAuthorization}></RegistrationForm>}
      </div>
    );
  }
}

export default AuthorizationPage;