import React, { Component } from 'react';
import ShowRecipe from '../../components/ShowRecipe/ShowRecipe';
import axios from 'axios';
import classes from './ShowRecipes.css';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import FullRecipe from '../../components/FullRecipe/FullRecipe';

class ShowRecipes extends Component {

    state = {
        data : [],
        fullRecipe: false,
        whichRecipe: null
    }

    componentDidMount=async() =>{
        await axios.get('http://localhost:5000/recipe')
            .then( response => {
                this.setState({
                data: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    fullRecipeHandler = (recipe) => {
        axios.post('http://localhost:5000/recipe',recipe).then((res)=>{
            let ingredientsList=[];
            for(var i=0; i<res.data.length;i++)
            {
                ingredientsList.push(res.data[i].ingredientname);
            }
            recipe['ingredients']=ingredientsList;
            console.log(recipe);
            this.setState({whichRecipe:recipe,fullRecipe:true});
        });
    }

    cancelHandler = () => {
        this.setState( { fullRecipe: false } );
    }

    render(){
        var recipes = this.state.data.map((recipe)=>{
            return <div onClick={()=>{this.fullRecipeHandler(recipe)}} key={recipe.recipeid}>
                    <ShowRecipe
                        title={recipe.recipename}
                        photo={recipe.imagelink}
                        />
                    </div>;
        }).slice(0,8);
        
        let fullRecipeShow = <FullRecipe recipe={this.state.whichRecipe} />;

        return (
            <Aux>
                <Modal show={this.state.fullRecipe} modalClosed={this.cancelHandler}>
                    {fullRecipeShow}
                </Modal>
                <div className={classes.Posts}>
                    {recipes}
                </div>
            </Aux>
        );
    }
}

export default ShowRecipes;