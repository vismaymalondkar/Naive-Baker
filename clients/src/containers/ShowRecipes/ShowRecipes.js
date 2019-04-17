import React, { Component } from 'react';

// import ShowRecipe from '../../components/ShowRecipe/ShowRecipe';
import '../../materializecss/materialize.css';
import axios from 'axios';
import ShowRecipe from '../../components/ShowRecipe/ShowRecipe';
import './ShowRecipes.css';

class ShowRecipes extends Component {

    state = {
        data : [],
        fullRecipe: false,
        whichRecipe: null
    }

    componentWillMount=async() =>{
         axios.get('http://localhost:8000/recipe')
            .then( response => {
                this.setState({
                data: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        var recipes = this.state.data.map((recipe)=>{
            return <div className="col" key={recipe.recipeid} >
                    <ShowRecipe
                        id={recipe.recipeid}
                        title={recipe.recipename}
                        photo={recipe.imagelink}
                        width='330px' />
                    </div>;
        }).slice(0,9);
        
        // let fullRecipeShow = <FullRecipe recipe={this.state.whichRecipe} />;

        return (
            <div className="container">
                <div className="row card-columns">
                    {recipes}
                </div>
            </div>
        );
    }
}

export default ShowRecipes;