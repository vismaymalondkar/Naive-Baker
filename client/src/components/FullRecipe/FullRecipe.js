import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';

class FullRecipe extends Component {


    render () {
        let showRecipe=null;
        if(this.props.recipe)
        {
            showRecipe=(<Aux>
                <h3>{this.props.recipe.title}</h3>
                <p><strong>Ingredients:</strong>{this.props.recipe.ingredients}</p>
                <p>Recipe Method:</p>
                <p>Continue Watching Other Recipes?</p>
            </Aux>);
        }
        return (
            <div>
                {showRecipe}
            </div>
        );
    }
}

export default FullRecipe;