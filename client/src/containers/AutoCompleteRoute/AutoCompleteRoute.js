import React, { Component } from 'react'

import Autocomplete from '../../Search/Autocomplete';
import classes from './AutoCompleteRoute.css';
//import axios from 'axios';

export default class AutoCompleteRoute extends Component {
    state = {
        suggestions: [
          "Carrot",
          "Butter",
          "Cheese",
          "Apple",
          "Eggs",
          "Bread",
          "Rice",
          "Oil",
          "Spinach",
          "Eggies",
          "champagne",
          "ice"
        ]
      };
      componentDidMount() {
        // axios.get('http://localhost:5000/getIngredientList')
        //     .then( response => {
        //         this.setState({
        //         suggestions: response.data.ingredient_name
        //     });
        // })
        // .catch(function (error) {
        //     console.log(error);
        // }).then(()=> {
        //     console.log(this.state.suggestions);
        //     var temp=this.state.suggestions;
        //     temp.sort();
        //     this.setState({suggestions:temp});
        // });
          
        }
  render() {
    return (
      <div className={classes.AutoComplete}>
        <Autocomplete suggestions={this.state.suggestions} />
      </div>
    )
  }
}
