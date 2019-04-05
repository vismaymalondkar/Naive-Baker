import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import classes from './SelectionBox.css';

class SelectionBox extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {  
            suggestions: [],
            value: '',
        }

        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onChange = this.onChange.bind(this);
        this.enterButton = this.enterButton.bind(this);
    }  

    getSuggestions(value)
    {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : this.props.list.filter(
            listItem => listItem[this.props.name].toLowerCase().slice(0, inputLength) === inputValue
        );
    }
    
    getSuggestionValue(suggestion) 
    {
        return suggestion[this.props.name];
    }

    renderSuggestion(suggestion)
    {
        return (
            <div className = {classes.selectionboxSuggetions}>
                {suggestion[this.props.name]}
            </div>
        );
    }

    onSuggestionsFetchRequested({ value })
    {
        this.setState({suggestions: this.getSuggestions(value)});
    };
    
    
    onSuggestionsClearRequested()
    {
        this.setState({suggestions: []});
    };

    onChange(event, { newValue }) 
    {
        this.setState({value: newValue});
    };

    enterButton()
    {
        const inputValue = this.state.value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        if(inputLength > 0)
        {
            const listItem = this.props.list.find(listItem => (listItem[this.props.name].toLowerCase() === inputValue));
            
            if(listItem)
                this.props.updateSelected({addList: this.props.addList, removeList: this.props.removeList, item: listItem});
        }
    };

    render()
    {        
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: this.props.placeholder,
            value,
            onChange: this.onChange
        };

        const theme = {
            container: {
                display: 'inline-block', 
            },
            input: {
                display: 'inline-block', 
                height: '2.5rem', 
                width: '15rem',
                borderRadius: '0.5rem',
                textAlign: 'center',
                verticalAlign: 'middle'
            },
            inputOpen: {
                display: 'inline-block', 
                height: '2.5rem', 
                width: '15rem',
                textAlign: 'center'
            },
            suggestion: {
                
            },
            suggestionHighlighted: {
                backgroundColor: '#2979ff',
                color: '#fafafa',
                padding: '0px',
                margin: '0px'
            },
            suggestionsContainerOpen: {
                borderBottomLeftRadius: '0.5rem',
                borderBottomRightRadius: '0.5rem',
                textAlign: 'center',
                display: 'block',
                position: 'absolute',
                backgroundColor: '#f9f9f9',
                width: '15rem',
                boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)'
            },
            suggestionsList: {
                listStyleType: 'none',
                textAlign: 'center',
                padding: '0px',
                margin: '0px'
            }
        }

        return (  
            <div className = {classes.selectionboxContainer}>
                <div className = {classes.selectionboxWrapper}>
                <Autosuggest
                        suggestions = {suggestions}
                        onSuggestionsFetchRequested = {this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested = {this.onSuggestionsClearRequested}
                        getSuggestionValue = {this.getSuggestionValue}
                        renderSuggestion = {this.renderSuggestion}
                        inputProps = {inputProps}
                        theme = {theme}
                        highlightFirstSuggestion = {false}
                        focusInputOnSuggestionClick = {true}
                />
                </div>
                <button  
                    onClick = {this.enterButton}
                    className = {classes.selectionboxEnterButton}
                >
                    Enter
                </button>
            </div>
        );
    }
}
 
export default SelectionBox;