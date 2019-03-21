import React, { Component } from 'react';

import classes from './NewRecipe.css';
import { Redirect } from 'react-router-dom';
import { variables } from '../NaiveBaker/NaiveBaker';
import axios from 'axios';

class NewRecipe extends Component {
    state = {
        title: '',
        ingredient: '',
        category:'VEG',
        mealType:'BREAKFAST',
        cookingTime:60,
        calories:0.0,
        imageLink:'',
        cuisine:'',
        description:'',
        procedure:'',
        userid:variables.userID
    }

    postDataHandler = () => {
        axios.post('/newrecipe',this.state);
    }

    render () {

        return (
            <div className={classes.NewPost}>
                {(!variables.authenticatedUser)?<Redirect to="/login"/>:''}
                <h1>Add a Recipe</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Ingredients</label>
                <input type="text" value={this.state.ingredient} onChange={(event) => this.setState({ingredient: event.target.value})} />
                <label>Category</label>
                <select value={this.state.category} onChange={( event ) => this.setState( { category: event.target.value } )}>
                    <option value="VEG">Veg</option>
                    <option value="NON-VEG">NON-Veg</option>
                    <option value="CONTAINS-EGGS">Contains-EGGS</option>
                    <option value="VEGAN">VEGAN</option>
                </select>
                <label>Meal Type</label>
                <select value={this.state.mealType} onChange={( event ) => this.setState( { mealType: event.target.value } )}>
                    <option value="BREAKFAST">Breakfast</option>
                    <option value="LUNCH">Lunch</option>
                    <option value="DINNER">Dinner</option>
                </select>
                <label>Cooking Time<em style={{fontWeight:'100'}}>(in minutes)</em></label>
                <input type="number" value={this.state.cookingTime} onChange={(event) => this.setState({cookingTime: event.target.value})} />
                <label>Calories</label>
                <input type="number" value={this.state.calories} onChange={(event) => this.setState({calories: event.target.value})} />
                <label>Cuisine</label>
                <input type="text" value={this.state.cuisine} onChange={(event) => this.setState({cuisine: event.target.value})} />
                <label>Image Link</label>
                <input type="text" value={this.state.imageLink} onChange={(event) => this.setState({imageLink: event.target.value})} />
                <label>Procedure</label>
                <textarea rows="4" value={this.state.procedure} onChange={(event) => this.setState({procedure: event.target.value})} />
                <label>Description</label>
                <textarea rows="4" value={this.state.description} onChange={(event) => this.setState({description: event.target.value})} />
                <button onClick={this.postDataHandler}>Add Recipe</button>
            </div>
        );
    }
}

export default NewRecipe;