import React, { Component } from 'react';
import client from '../client.js'
import TextInput from '../components/Form/TextInput'
import Password from '../components/Form/Password'
import validate from '../components/Form/validate'

class LoginForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      users: [],
      // inputUsername: "",
      // inputPassword: "",
      isExist: false,
      formControls: {
        username: {
          value: '',
          valid: false,
          placeholder: 'Username:',
					touched: false,
          validationRules: {
            isRequired: true
          }         
        },
        password: {
          value: '',
          valid: false,
          placeholder: 'Password:',
					touched: false,
          validationRules: {
            isRequired: true
          }         
        },
      }
    };
  
    // this.inputUsernameChanged = this.inputUsernameChanged.bind(this);
    // this.inputPasswordChanged = this.inputPasswordChanged.bind(this);
    this.loginButtonClicked = this.loginButtonClicked.bind(this); 
  }

  componentDidMount(){
    client.getUsers((users) => {
      this.setState({
        users: users
      });
    });
  }

  onLogRegisterButtonClick = () => {
      this.props.onLogRegisterButtonClick()
  }

  // inputUsernameChanged(event) {
  //   this.setState({
  //     inputUsername: event.target.value
  //   });
  // }
  
  // inputPasswordChanged(event) {
  //   this.setState({
  //     inputPassword: event.target.value
  //   });
  // }
  
  
  loginButtonClicked() {

    var inputUsername = this.state.formControls.username.value;
    var inputPassword = this.state.formControls.password.value;

    for(var i=0; i<this.state.users.length; i++){
     if (this.state.users[i].username === inputUsername && this.state.users[i].password === inputPassword){
      this.setState({
        isExist: true,
       })
     }
    }

    if(inputUsername.length<=0 || inputPassword.length<=0){
      alert('Please, fill all fields!')
    }
    else if (!this.state.isExist){
      alert('No such user. Please, try again!' + this.state.isExist)
    }
    else{
      alert('Welcome' + inputUsername)
      this.props.onLoginButtonClick({username: inputUsername, isAuthorized: true})
    }

    this.setState({
      // inputUsername: "",
      // inputPassword: "",
      inputConfPassword: ""
    });
  }

  changeHandler = event => {
    
    const name = event.target.name;
    const value = event.target.value;

    const updatedControls = {
      ...this.state.formControls
    };
    const updatedFormElement = {
      ...updatedControls[name]
    };
    updatedFormElement.value = value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

    updatedControls[name] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedControls) {
      formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      formControls: updatedControls,
      formIsValid: formIsValid
    });

  }

  formSubmitHandler = () => {
    const formData = {};
    	for (let formElementId in this.state.formControls) {
	      formData[formElementId] = this.state.formControls[formElementId].value;
	    }
    
    	this.loginButtonClicked();
  }


  render() {
    return (
      <div>
      <h3>This is LoginForm</h3>

      <TextInput name = "username" placeholder={this.state.formControls.username.placeholder}
                               value={this.state.formControls.username.value}
                               onChange={this.changeHandler}
                               touched={this.state.formControls.username.touched}
                               valid={this.state.formControls.username.valid}/>
      <Password name = "password" placeholder={this.state.formControls.password.placeholder}
                               value={this.state.formControls.password.value}
                               onChange={this.changeHandler}
                               touched={this.state.formControls.password.touched}
                               valid={this.state.formControls.password.valid}/>
                              
      <button onClick={this.formSubmitHandler} disabled={!this.state.formIsValid} > Login </button>  

      <h5>Don't have an accout?</h5>
      <button onClick = {this.onLogRegisterButtonClick}>Register</button>
      </div>
    );
  }
}

export default LoginForm;

{/* <input value={this.state.inputUsername} onChange={this.inputUsernameChanged} placeholder="Username:"/>
      <input value={this.state.inputPassword} onChange={this.inputPasswordChanged} placeholder="Password:"/>
      <button onClick={this.LoginButtonClicked}>Login</button>
      <h5>Don't have an accout?</h5>
      <button onClick = {this.onLogRegisterButtonClick}>Register</button> */}