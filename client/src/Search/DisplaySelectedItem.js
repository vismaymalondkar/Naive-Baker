import React, { Component } from 'react';
import classes from './DisplaySelectedItem.css';

class DisplaySelectedItem extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {  }
    }

    render() 
    { 
        return (  
            <div className = {classes.displayselecteditemContainer}>
                {this.props.name}
                <div className = {classes.deleteIngredientButtonWrapper}>
                <button 
                    id = {this.props.id} 
                    className = {classes.deleteIngredientButton}
                    onClick = {this.props.onRemove}
                >
                    X
                </button>
                </div>
            </div>
        );
    }
}
 
export default DisplaySelectedItem;