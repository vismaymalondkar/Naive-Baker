import React, { Component } from 'react';
import ShowRecipe from '../../components/ShowRecipe/ShowRecipe';
import axios from 'axios';
import classes from './ShowRecipes.css';
import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import FullRecipe from '../../components/FullRecipe/FullRecipe';

class ShowRecipes extends Component {

    constructor(props){
        super( props );
        this.keyCount = 0;
        this.getKey = this.getKey.bind(this);
    }

    state = {
        data : [{"title":"Ginger Champagne","href":"http://allrecipes.com/Recipe/Ginger-Champagne/Detail.aspx","ingredients":"champagne, ginger, ice, vodka","thumbnail":"http://img.recipepuppy.com/1.jpg"},{"title":"Potato and Cheese Frittata","href":"http://allrecipes.com/Recipe/Potato-and-Cheese-Frittata/Detail.aspx","ingredients":"cheddar cheese, eggs, olive oil, onions, potato, salt","thumbnail":"http://img.recipepuppy.com/2.jpg"},{"title":"Eggnog Thumbprints","href":"http://allrecipes.com/Recipe/Eggnog-Thumbprints/Detail.aspx","ingredients":"brown sugar, butter, butter, powdered sugar, eggs, flour, nutmeg, rum, salt, vanilla extract, sugar","thumbnail":"http://img.recipepuppy.com/3.jpg"},{"title":"Succulent Pork Roast","href":"http://allrecipes.com/Recipe/Succulent-Pork-Roast/Detail.aspx","ingredients":"brown sugar, garlic, pork chops, water","thumbnail":"http://img.recipepuppy.com/4.jpg"},{"title":"Irish Champ","href":"http://allrecipes.com/Recipe/Irish-Champ/Detail.aspx","ingredients":"black pepper, butter, green onion, milk, potato, salt","thumbnail":"http://img.recipepuppy.com/5.jpg"},{"title":"Chocolate-Cherry Thumbprints","href":"http://allrecipes.com/Recipe/Chocolate-Cherry-Thumbprints/Detail.aspx","ingredients":"cocoa powder, baking powder, butter, eggs, flour, oats, salt, sugar, vanilla extract","thumbnail":"http://img.recipepuppy.com/6.jpg"},{"title":"Mean Woman Pasta","href":"http://allrecipes.com/Recipe/Mean-Woman-Pasta/Detail.aspx","ingredients":"garlic, kalamata olive, olive oil, pepperoncini, seashell pasta, tomato","thumbnail":"http://img.recipepuppy.com/7.jpg"},{"title":"Hot Spiced Cider","href":"http://allrecipes.com/Recipe/Hot-Spiced-Cider/Detail.aspx","ingredients":"allspice, apple cider, brown sugar, cinnamon, cloves, nutmeg, orange, salt","thumbnail":"http://img.recipepuppy.com/8.jpg"},{"title":"Isa's Cola de Mono","href":"http://allrecipes.com/Recipe/Isas-Cola-de-Mono/Detail.aspx","ingredients":"cinnamon, cloves, instant coffee, milk, rum, vanilla extract, water, sugar","thumbnail":"http://img.recipepuppy.com/9.jpg"},{"title":"Amy's Barbecue Chicken Salad","href":"http://allrecipes.com/Recipe/Amys-Barbecue-Chicken-Salad/Detail.aspx","ingredients":"barbecue sauce, chicken, cilantro, lettuce, ranch dressing, lettuce, tomato","thumbnail":"http://img.recipepuppy.com/10.jpg"}],
        data1 : null,
        fullRecipe: false,
        whichRecipe: null
    }

    componentDidMount() {
        axios.get('http://localhost:5000/recipe')
            .then( response => {
                this.setState({
                data1: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        }).then(()=> {
            console.log(this.state.data1);
        });
    }
    getKey(){
        return this.keyCount++;
    }

    fullRecipeHandler = (recipe) => {
        this.setState({whichRecipe:recipe});
        this.setState({fullRecipe:true});
    }

    cancelHandler = () => {
        this.setState( { fullRecipe: false } );
    }

    render(){
        var recipes = this.state.data.map((recipe)=>{
            return <div onClick={()=>{this.fullRecipeHandler(recipe)}} key={this.getKey()}>
                    <ShowRecipe
                        title={recipe.title}
                        href={recipe.href}
                        ingredients={recipe.ingredients}
                        photo={recipe.thumbnail}
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