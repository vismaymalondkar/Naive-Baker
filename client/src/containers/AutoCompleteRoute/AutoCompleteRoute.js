import React, { Component } from 'react'

import Autocomplete from '../../Search/Autocomplete';
import classes from './AutoCompleteRoute.css';
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
          "Eggies"
        ]
      };
      componentDidMount() {
          var temp=this.state.suggestions;
          temp.sort();
          this.setState({suggestions:temp});
        }
  render() {
    return (
      <center><div className={classes.AutoComplete}>
        <Autocomplete suggestions={this.state.suggestions} />
      </div></center>
    )
  }
}
