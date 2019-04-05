import React, { Component } from 'react';
import ShowRecipe from '../components/ShowRecipe/ShowRecipe';
import axios from 'axios';
import classes from '../containers/ShowRecipes/ShowRecipes.css';
//import Auxil from '../hoc/Auxil/Auxil';
import Modal from '../components/UI/Modal/Modal';
import FullRecipe from '../components/FullRecipe/FullRecipe';

class SearchResult extends Component 
{
    state = {
        fullRecipe: false,
        whichRecipe: null
    }

    fullRecipeHandler = (recipe) => {
        axios.post('http://localhost:5000/recipe',recipe).then((res)=>{
            let ingredientsList=[];
            for(var i=0; i<res.data.length;i++)
            {
                ingredientsList.push(res.data[i].ingredientname);
            }
            recipe['ingredients']=ingredientsList;
            
            this.setState({whichRecipe:recipe,fullRecipe:true});
        });
    }

    cancelHandler = () => {
        this.setState( { fullRecipe: false } );
    }

    render(){
        var recipes = this.props.recipes ?
         this.props.recipes.map((recipe)=>{
            return <div onClick={()=>{this.fullRecipeHandler(recipe)}} key={recipe.recipeid}>
                    <ShowRecipe
                        title={recipe.recipename}
                        photo={recipe.imagelink}
                        />
                    </div>;
        }) : null;
        
        let fullRecipeShow = <FullRecipe recipe={this.state.whichRecipe} />;

        return (
            <div>
                <Modal show={this.state.fullRecipe} modalClosed={this.cancelHandler}>
                    {fullRecipeShow}
                </Modal>
                <div className={classes.Posts}>
                    {recipes}
                </div>
            </div>
        );
    }
}
 
export default SearchResult;