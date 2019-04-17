import React, { Component } from 'react';
import axios from 'axios';

import '../../materializecss/materialize.css';

import { variables } from '../NaiveBaker';

class NewRecipe extends Component {
    state = {
        title: '',
        ingredient: '',
        category:'VEG',
        mealType:'BREAKFAST',
        cookingTime:60,
        calories:200,
        imageLink:'',
        cuisine:'',
        description:'',
        procedure:'',
        userid:variables.userID,
        cnt:0,
        recipeAdded:false
    }

    postDataHandler = () => {
        if(this.state.calories && this.state.cookingTime && this.state.title.trim()!=='' && this.state.ingredient.trim()!=='' && this.state.imageLink.trim()!=='' && this.state.cuisine.trim()!=='' && this.state.description.trim()!=='' && this.state.procedure.trim()!=='')
        {
            axios.post('http://localhost:8000/newrecipe',this.state);
            this.setState({title:'',ingredient:'',category:'VEG',mealType:'BREAKFAST',cookingTime:60,calories:0.0,imageLink:'',cuisine:'',description:'',procedure:'',recipeAdded:true,cnt:0});
        }
        else
        {
            this.setState({recipeAdded:false,cnt:1});
        }
    }

    render () {
        return (
        <div>
            <div className="row" style={{width:"60%"}}>
                    <div className="col s12 14 offset-14">
                        <div className="card z-depth-5">
                            <form>
                                <div className="card-content">
                                    <div className="form-field col s6">
                                        <label >Title</label>
                                        <input type="text" id="title" required value={this.state.title} onChange={(event) => this.setState({title: event.target.value})}/>
                                    </div>
                                    <div className="form-field col s6">
                                        <label>Cooking Time<em style={{fontWeight:'100'}}>(in minutes)</em></label>
                                        <input type="number" value={this.state.cookingTime} onChange={(event) => this.setState({cookingTime: event.target.value < 0 ? Math.abs(event.target.value) : event.target.value})}/>
                                    </div><br/>
                                    <div className="form-field col s6" value={this.state.category} onChange={( event ) => this.setState( { category: event.target.value } )}>
                                        <label>Category</label>
                                        <select className="browser-default">
                                            <option value="VEG">Veg</option>
                                            <option value="NON-VEG">NON-Veg</option>
                                            <option value="CONTAINS-EGGS">Contains-EGGS</option>
                                            <option value="VEGAN">VEGAN</option>
                                        </select>
                                    </div><br/>
                                    <div className="form-field col s6" value={this.state.mealType} onChange={( event ) => this.setState( { mealType: event.target.value } )}>
                                        <label>Meal Type</label>
                                        <select className="browser-default">
                                            <option value="BREAKFAST">Breakfast</option>
                                            <option value="LUNCH">Lunch</option>
                                            <option value="DINNER">Dinner</option>
                                        </select>
                                    </div><br/>
                                    <div className="form-field col s6">
                                        <label >Cuisine</label>
                                        <input type="text" required id="cuisine" value={this.state.cuisine} onChange={(event) => this.setState({cuisine: event.target.value})}/>
                                    </div>
                                    <div className="form-field col s6">
                                        <label>Calories</label>
                                        <input type="number" value={this.state.calories} onChange={(event) => this.setState({calories: event.target.value < 0 ? Math.abs(event.target.value) : event.target.value})}/>
                                    </div><br/>
                                    <div className="form-field col s12">
                                        <label>Ingredients</label>
                                        <input type="text" required value={this.state.ingredient} onChange={(event) => this.setState({ingredient: event.target.value.toLowerCase()})}/>
                                    </div><br/>
                                    <div className="form-field col s12">
                                        <label>Image Link</label>
                                        <input type="text" required value={this.state.imageLink} onChange={(event) => this.setState({imageLink: event.target.value})}/>
                                    </div><br/>
                                    <div className="form-field col s12">
                                        <label>Procedure</label>
                                        <textarea rows='4' required className="materialize-textarea" value={this.state.procedure} onChange={(event) => this.setState({procedure: event.target.value})}/>
                                    </div><br/>
                                    <div className="form-field col s12">
                                        <label>Description</label>
                                        <textarea rows='4' required className="materialize-textarea" value={this.state.description} onChange={(event) => this.setState({description: event.target.value})}/>
                                    </div><br/>
                                    <center>{this.state.recipeAdded===true?<em style={{color:'green'}}>Recipe Added</em>:''}
                                    {this.state.cnt===1?<em style={{color:'red'}}>Enter Valid Data</em>:''}</center>
                                    <div className="form-field center">
                                        <button type="submit" className="btn-large blue" onClick={this.postDataHandler} value="Login">Add Recipe</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewRecipe;