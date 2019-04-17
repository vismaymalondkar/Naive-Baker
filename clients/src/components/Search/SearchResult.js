import React, { Component } from 'react';

// import ShowRecipe from '../../components/ShowRecipe/ShowRecipe';
import '../../materializecss/materialize.css';

import ShowRecipe from '../ShowRecipe/ShowRecipe';
import './SearchResult.css';

class SearchResult extends Component {

    state = {
        data : [],
        fullRecipe: false,
        whichRecipe: null
    }

    render(){
        var recipes = this.props.recipes.map((recipe)=>{
            return <div className="col" key={recipe.recipeid}>
                    <ShowRecipe
                        id={recipe.recipeid}
                        title={recipe.recipename}
                        photo={recipe.imagelink}
                        width='330px' 
                        ingredients={this.props.ingredients}/>
                    </div>;
        }).slice(0,9);
        
        // let fullRecipeShow = <FullRecipe recipe={this.state.whichRecipe} />;

        return (
            <div className="container">
                <div className="row card-columns" style={{columnCount:'2'}}>
                    {recipes}
                </div>
            </div>
        );
    }
}

export default SearchResult;