import React, { Component } from 'react';
import '../css/Search.css';
import TextInput from '../components/Form/TextInput'
import validate from '../components/Form/validate'
import Select from '../components/Form/Select'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

class Search extends Component {
  constructor(props){
    super(props);
    this.state = {
      formIsValid: false,
      formControls: {
        city: {
          value: '',
          valid: false,
          placeholder: 'Enter the city...',
					touched: false,
          validationRules: {
            isRequired: true
          }         
        },
        
        petrol: {
          value: 'AI-92',
          placeholder: 'Select petrol type',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
          },
          options: [
            { value: '92', displayValue: 'AI-92' },
            { value: '95', displayValue: 'AI-95' },
            { value: '98', displayValue: 'AI-98' },
            { value: 'dt', displayValue: 'Diesel fuel'}
          ]
        }
      }
    }
  }


  startSearch = () => {
    this.props.onSearchButtonClick({
      bodyContent: "/companyList",
      srchCity: this.state.formControls.city.value,
      srchPetrol: this.state.formControls.petrol.value});
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
    
    	this.startSearch();
  }

  render() {
    return (
      <div id= "search-main-container">      
      <TextInput name = "city" placeholder={this.state.formControls.city.placeholder}
                               value={this.state.formControls.city.value}
                               onChange={this.changeHandler}
                               touched={this.state.formControls.city.touched}
                               valid={this.state.formControls.city.valid}/>
      <Select name="petrol"
                  value={this.state.formControls.petrol.value}
                  onChange={this.changeHandler}
                  options={this.state.formControls.petrol.options}
                  touched={this.state.formControls.petrol.touched}
                  valid={this.state.formControls.petrol.valid}
          />
          <Link to = '/companyList' onClick={this.formSubmitHandler} disabled={!this.state.formIsValid}>Search</Link>
      
      </div>
    );
  }
}

export default Search;

//<button onClick={this.formSubmitHandler} disabled={!this.state.formIsValid}> Search </button>