import React, { Component } from 'react';

import classes from './NewRecipe.css';
import { Redirect } from 'react-router-dom';
import { variables } from '../NaiveBaker/NaiveBaker';

class NewRecipe extends Component {
    state = {
        title: '',
        ingredient: '',
        Ingredients: [],
        Procedure:'',
    }

    postDataHandler(){
        
    }
    //             <label>Author</label>
    //             <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
    //                 <option value="Max">Max</option>
    //                 <option value="Manu">Manu</option>
    //             </select>
    render () {

        return (
            <div className={classes.NewPost}>
                {!variables.authenticatedUser?<Redirect to="/login"/>:''}
                <h1>Add a Recipe</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Ingredients</label>
                <input type="text" value={this.state.ingredient} onChange={(event) => this.setState({ingredient: event.target.value})} />
                <label>Procedure</label>
                <textarea rows="4" value={this.state.Procedure} onChange={(event) => this.setState({Procedure: event.target.value})} />
                <button onClick={this.postDataHandler}>Add Recipe</button>
            </div>
        );
    }
}

export default NewRecipe;