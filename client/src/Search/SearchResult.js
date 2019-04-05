import React, { Component } from 'react';
import FeaturedCard from './FeaturedCard'
import CardColumns from 'react-bootstrap/CardColumns';
import classes from './SearchResult.css';

class SearchResult extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
        };
    }

    
    render() 
    {   
        const featured = this.props.recipes.map(recipe => <FeaturedCard key = {recipe.recipeid} recipe = {recipe}/>);
        
        return (  
            <div className = {classes.searchresultContainer}>
            <CardColumns style = {{width: '50%'}}>
                {featured.length === 0 ? null : featured}
            </CardColumns>
            </div>
        );
    }
}
 
export default SearchResult;