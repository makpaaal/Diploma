import React, { Component } from 'react';
import client from '../client.js'
import TextArea from '../components/Form/TextArea'
import Select from '../components/Form/Select'
import validate from '../components/Form/validate'

class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      formIsValid: false,
      formControls: {
        content: {
          value: '',
          valid: false,
          placeholder: 'Enter your review...',
					touched: false,
          validationRules: {
            isRequired: true
          }         
        },
        
        mark: {
          value: '',
          placeholder: 'Your mark',
          valid: false,
          touched: false,
          validationRules: {
            isRequired: true,
          },
          options: [
            { value: '5', displayValue: 'Very good' },
            { value: '4', displayValue: 'Good' },
            { value: '3', displayValue: 'Medium' },
            { value: '2', displayValue: 'Bad' },
            { value: '1', displayValue: 'Very bad' },
          ]
        }
      }
    };

    this.buttonClicked = this.buttonClicked.bind(this); 
  }

  componentDidMount(){
    client.getReviews((reviews) => {
      this.setState({
        reviews: reviews
      });
    });
  }

  buttonClicked() {

    const data = {
      'id': this.state.reviews[this.state.reviews.length - 1].id + 1,
      'station': this.props.station,
      'author': this.props.username,
      'content': this.state.formControls.content.value,
      'mark': this.state.formControls.mark.value,
    }
    
    this.setState({
      reviews: [...this.state.reviews, data]
    });
    
    client.createReview(data, (review) => {
      if (review)
        alert('Thank you for your review!');
    });  

    this.props.updatePage();
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
    
    	this.buttonClicked();
  }

  render() {
    return (
      <div>
        <TextArea name = "content" placeholder={this.state.formControls.content.placeholder}
                               value={this.state.formControls.content.value}
                               onChange={this.changeHandler}
                               touched={this.state.formControls.content.touched}
                               valid={this.state.formControls.content.valid}/>
      <Select name="mark"
                  value={this.state.formControls.mark.value}
                  onChange={this.changeHandler}
                  options={this.state.formControls.mark.options}
                  touched={this.state.formControls.mark.touched}
                  valid={this.state.formControls.mark.valid}
          />
      <button onClick={this.formSubmitHandler} disabled={!this.state.formIsValid || !this.props.isAuthorized} > Add Review </button>
      </div>
    );
  }
}

export default ReviewForm;
