import React, { Component } from 'react';
import classes from './Checkbox.css';

class Checkbox extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {  }
    }

    render() { 
        return (  
            <div className = {classes.checkboxContainer}>
            <input 
                type = "checkbox" 
                name = {this.props.name} 
                checked = {this.props.checked} 
                onChange = {this.props.onChange} 
            />
            </div>
        );
    }
}
 
export default Checkbox;