import React, { Component } from 'react'

import Search from '../../Search/Search';
import axios from 'axios';

export default class AutoCompleteRoute extends Component {
    state = {
        suggestions: []
      };
      componentWillMount() {
        axios.get('http://localhost:5000/getIngredientList')
            .then( response => {
              var tmp=this.state.suggestions;
            for(var i=0; i<response.data.length;i++)
            {
              tmp.push(response.data[i].ingredientname);
            }
            this.setState({
              suggestions: tmp
            });
        })
        .catch(function (error) {
            console.log(error);
        }).then(()=> {
            var temp=this.state.suggestions;
            temp.sort();
            this.setState({suggestions:temp});
        });
          
        }
  render() {
    return (
        <Search suggestions={this.state.suggestions} />
    )
  }
}
