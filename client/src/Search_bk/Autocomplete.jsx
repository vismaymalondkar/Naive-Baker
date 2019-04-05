import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classes from './style.css';

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
      selectedIngredients: []
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    let filteredSuggestions = [];
    let newSuggestions=[];
    for(var i=0; i<suggestions.length; i++)
    {
      if(suggestions[i].toLowerCase().indexOf(userInput.toLowerCase()) !== -1)
      {
        newSuggestions.push([suggestions[i].toLowerCase().indexOf(userInput.toLowerCase()),suggestions[i]]);
      }
    }
    newSuggestions.sort();
    for(i=0; i<newSuggestions.length; i++)
    {
      filteredSuggestions.push(newSuggestions[i][1]);
    }
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      let temp=this.state.selectedIngredients;
      if(!temp.includes(filteredSuggestions[activeSuggestion]))
        temp.push(filteredSuggestions[activeSuggestion]);
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion],
        selectedIngredients:temp
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  deleteIngredientHandler = (ingredientToDelete) => {
    let temp=this.state.selectedIngredients;
    temp.splice(ingredientToDelete,1);
    this.setState({selectedIngredients:temp});
  }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <center><ul className={classes.suggestions}>
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = classes.suggestionactive;
              }
              return (
                <div key={suggestion} >
                  <li className={className}  onClick={onClick}>
                    {suggestion}
                  </li>
                </div>
              );
            })}
          </ul></center>
        );
      } else {
        suggestionsListComponent = (
          <div className={classes.nosuggestions}>
            <center><em>No suggestions, you're on your own!</em></center>
          </div>
        );
      }
    }

    let printSelectedIngredients= (<ul style={{listStyle:'none'}}>
        {this.state.selectedIngredients.map((suggestion, index)=>{
          return (<li onClick={()=>this.deleteIngredientHandler(index)} key={suggestion}>
           {suggestion}
          </li>);
        })}
        </ul>
      );

    return (
      <Fragment>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <center className={classes.centerclass}>
          <input
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          <button type="submit"><i className="fa fa-search"></i></button>
        {suggestionsListComponent}
        <div className={classes.selected}>
        <h3>Selected Ingredients</h3>
        {printSelectedIngredients}
        </div>
        </center>
      </Fragment>
    );
  }
}

export default Autocomplete;
