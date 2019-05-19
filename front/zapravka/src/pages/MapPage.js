import React, { Component } from 'react';
import Iframe from 'react-iframe'
import validate from '../components/Form/validate'
import Select from '../components/Form/Select'

class MapPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      cityToShow: "",
      formIsValid: false,
      formControls: {        
        city: {
          value: 'Almaty',
          placeholder: 'Select the city',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
          },
          options: [
            { value: 'Almaty', displayValue: 'Almaty' },
            { value: 'Astana', displayValue: 'Astana' },
            { value: 'Semey', displayValue: 'Semey' },
            { value: 'Atyrau', displayValue: 'Atyrau' },
            { value: 'Kyzylorda', displayValue: 'Kyzylorda' },
          ]
        }
      }
    }
  }

  showButtonClick = ()=> {
    this.setState({
      cityToShow: this.state.formControls.city.value,
    })
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

    this.showButtonClick();
  } 

  render() {
    var city = this.state.cityToShow;
    return (
      <div>
          <h1>MapPage</h1>
          <Select name="city"
                  value={this.state.formControls.city.value}
                  onChange={this.changeHandler}
                  options={this.state.formControls.city.options}
                  touched={this.state.formControls.city.touched}
                  valid={this.state.formControls.city.valid}
          />
          <button onClick = {this.formSubmitHandler}>Show</button>
          { 
            (city === "Almaty")
            ? <Iframe url="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d46498.55524372788!2d76.87749834457124!3d43.248074640880574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0LDQt9GBINCw0LvQvNCw0YLRiw!5e0!3m2!1sru!2skz!4v1553683875133" 
                      width="600" 
                      height="450" 
                      frameborder="0" 
                      style="border:0" 
                      allowfullscreen/>
            : (city === "Astana") ? <Iframe url="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d46498.55524372788!2d76.87749834457124!3d43.248074640880574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0LDQt9GBINCw0LvQvNCw0YLRiw!5e0!3m2!1sru!2skz!4v1553683875133" 
                                            width="600" 
                                            height="350" 
                                            frameborder="0" 
                                            style="border:0" 
                                            allowfullscreen/>
            : (city === "Semey") ? <Iframe url="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d46498.55524372788!2d76.87749834457124!3d43.248074640880574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0LDQt9GBINCw0LvQvNCw0YLRiw!5e0!3m2!1sru!2skz!4v1553683875133" 
                                            width="600" 
                                            height="450" 
                                            frameborder="0" 
                                            style="border:0" 
                                            allowfullscreen/>
            : (city === "Atyrau") ? <Iframe url="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d46498.55524372788!2d76.87749834457124!3d43.248074640880574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0LDQt9GBINCw0LvQvNCw0YLRiw!5e0!3m2!1sru!2skz!4v1553683875133" 
                                            width="600" 
                                            height="450" 
                                            frameborder="0" 
                                            style="border:0" 
                                            allowfullscreen/>
            : (city === "Kyzylorda") ? <Iframe url="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d46498.55524372788!2d76.87749834457124!3d43.248074640880574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z0LDQt9GBINCw0LvQvNCw0YLRiw!5e0!3m2!1sru!2skz!4v1553683875133" 
                                            width="600" 
                                            height="450" 
                                            frameborder="0" 
                                            style="border:0" 
                                            allowfullscreen/>
            : null
          }
      </div>
    );
  }
}

export default MapPage;
