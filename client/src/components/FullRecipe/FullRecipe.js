import React, { Component } from 'react';
import { variables } from '../../containers/NaiveBaker/NaiveBaker';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import classes from './FullRecipe.css';

class FullRecipe extends Component {

    state = {
        like:false,
        toggleClass:false,
        count:0
    }

    likeHandler = () => {
        if(variables.authenticatedUser)
        {
            let recipe=this.props.recipe;
            recipe['userid']=variables.userID;
            if(!this.state.toggleClass)
            {
                axios.post('http://localhost:5000/likerecipe',recipe);
                this.setState({toggleClass:true});
            }
            else
            {
                axios.post('http://localhost:5000/dislikerecipe',recipe);
                this.setState({toggleClass:false});
            }
        }
        else
        {
            this.setState({like:true});
        }
    }

    render () {
        if(variables.authenticatedUser && this.props.recipe && !this.state.toggleClass && this.state.count===0)
        {
            let recipes=this.props.recipe;
            recipes['userid']=variables.userID;
            axios.post('http://localhost:5000/checklikedrecipe',recipes).then((res)=>{
                let cl=false;
                if(res.data.length>0) 
                {
                    cl=true;
                }
                this.setState({toggleClass:cl,count:1});
            });
        }
        let showRecipe=null;
        let classLike=classes.buttonLike;
        if(this.state.toggleClass)
        {
            classLike=classes.liked;
        }
        if(this.props.recipe)
        {
            showRecipe=(<div>
                <h3>{this.props.recipe.recipename}</h3>
                <p><strong>Ingredients: </strong>{this.props.recipe.ingredients.join(',')}</p>
                <p><strong>Recipe Method: </strong>{this.props.recipe.cookingprocedure}</p>
                <p><strong>Description: </strong>{this.props.recipe.description}</p>
                <p><strong>Cooking Time: </strong>{this.props.recipe.cookingtime}</p>
                <p><strong>Cuisine: </strong>{this.props.recipe.cuisine}</p>
                <p><strong>Category: </strong>{this.props.recipe.category}</p>
                <p><strong>Calories: </strong>{this.props.recipe.calories}</p>
                <p><strong>Meal Type: </strong>{this.props.recipe.mealtype}</p>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <button className={[classes.button,classLike].join(' ')} onClick={this.likeHandler}>
                    <i className={classes.fa}><i className='fa fa-heart'></i></i>
                    <span>Like</span>
                </button>
                {this.state.like?<Redirect to='/login' />:''}
            </div>);
        }
        return (
            <div>
                {showRecipe}
            </div>
        );
    }
}

export default FullRecipe;