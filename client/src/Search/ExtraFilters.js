import React, { Component } from 'react';
import classes from './ExtraFilters.css'

class ExtraFilters extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {  

        }
    }

    render() { 
        const header = <div className = {classes.extraFilterHeader}>{"Extra Filters"}</div>;

        return (  
            <div className = {classes.extraFilterContainer}>
                {header}
                <div className = {classes.inputContainer}>
                    <label className = {classes.caloriesLabel}>
                        <text>Calories:</text>
                        <input
                            name = "calories"
                            type = "number"
                            min = "0"
                            value = {this.props.calories}
                            placeholder = "Enter number of calories"
                            className = {classes.caloriesInput}
                            onChange = {(e) => this.props.onChange(e)}
                        >
                        </input>
                    </label>
                    
                    
                    <label className = {classes.cookingTimeLabel}>
                        <text>Cooking Time:</text>
                        <input
                            name = "cookingTimeHr"
                            type = "number"
                            min = "0"
                            value = {this.props.cookingTimeHr}
                            placeholder = "HH"
                            className = {classes.cookingTimeInput}
                            onChange = {(e) => this.props.onChange(e)}
                        >
                        </input>
                        
                        <input
                            name = "cookingTimeMin"
                            min = "0"
                            value = {this.props.cookingTimeMin}
                            placeholder = "MM"
                            className = {classes.cookingTimeInput}
                            onChange = {(e) => this.props.onChange(e)}
                        >
                        </input>
                    </label>
                </div>
            </div>
        );
    }
}
 
export default ExtraFilters;