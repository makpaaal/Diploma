const BASE_URL = 'http://localhost:8000/api';

module.exports = {
   
  getMembers(success){
    fetch(`${BASE_URL}/members/`)
      .then(response => response.json())
      .then(success)
  },

  getUsers(success){
    fetch(`${BASE_URL}/users/`)
      .then(response => response.json())
      .then(success)
  },

  createUser(data, success){
    fetch(`${BASE_URL}/users/`, {
      'method': 'POST',
      'body': JSON.stringify(data) 
    })
      
      .then(success)
  },

  getCities(success){
    fetch(`${BASE_URL}/cities/`)
      .then(response => response.json())
      .then(success)
  },

  getCompanies(success){
    fetch(`${BASE_URL}/companies/`)
      .then(response => response.json())
      .then(success)
  },

  getStations(success){
    fetch(`${BASE_URL}/stations/`)
      .then(response => response.json())
      .then(success)
  },

  getReviews(success){
    fetch(`${BASE_URL}/reviews/`)
      .then(response => response.json())
      .then(success)
  },

  createReview(data, success){
    fetch(`${BASE_URL}/reviews/`, {
      'method': 'POST',
      'body': JSON.stringify(data) 
    })
      .then(response => response.json())
      .then(success)
  },

}