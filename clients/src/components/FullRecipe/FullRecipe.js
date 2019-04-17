import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import {variables} from '../../containers/NaiveBaker';
import '../../materializecss/materialize.css';
import './FullRecipe.css';
class FullRecipe extends Component {
    constructor(){
        super();
        this.like=false;
        this.state = {
            recipe:null,
            like:false,
            toggleClass:false,
            count:0
        }
    }
    

    componentWillReceiveProps(nextProps){
        if(this.props.recipe && this.props.recipe!==nextProps.recipe) {this.setState({toggleClass:false,count:0});}
        //console.log(this.props,nextProps,this.state);
    }

    async componentWillMount(){
        await axios.post('http://localhost:8000/recipe',{'id':this.props.match.params.id}).then((res)=>{
            let ingredientsList=[];
            let recipe=res.data[0];
            for(var i=0; i<res.data[0]['ingredients'].length;i++)
            {
                ingredientsList.push(res.data[0]['ingredients'][i].ingredientname);
            }
            recipe['ingredients']=ingredientsList;
            this.setState({recipe:recipe});
        });
    }

    likeHandler = async() => {
        if(variables.authenticatedUser)
        {
            let recipe=this.state.recipe;
            recipe['userid']=variables.userID;
            if(!this.state.toggleClass)
            {
                axios.post('http://localhost:8000/likerecipe',recipe).then((res)=>{
                    console.log("HII",res)}
                );
                this.setState({toggleClass:true});
            }
            else
            {
                axios.post('http://localhost:8000/dislikerecipe',recipe);
                this.setState({toggleClass:false});
            }
            window.location.reload();
        }
        else
        {
            this.setState({like:true});
        }
    }

    render () {
        if(variables.authenticatedUser && this.state.recipe && !this.state.toggleClass && this.state.count===0)
        {
            let recipes=this.state.recipe;
            recipes['userid']=variables.userID;
            axios.post('http://localhost:8000/checklikedrecipe',recipes).then((res)=>{
                let cl=false;
                if(res.data.length>0) 
                {
                    cl=true;
                }
                this.setState({toggleClass:cl,count:1});
            });
        }
        let showRecipe=null;
        let likeString = 'Like';
        let classLike='buttonLike';
        if(this.state.toggleClass)
        {
            likeString='Liked';
            classLike='liked';
        }
        if(this.state.recipe)
        {
            showRecipe=(<div className="card" style={{width:'70%',margin:'auto'}}>
                <center><h3 style={{overflow:'auto'}}>{this.state.recipe.recipename}</h3></center>
                <hr/>
                <p><strong>Ingredients: </strong>{this.state.recipe.ingredients.join(',  ')}</p>
                <p><strong>Recipe Method: </strong>{this.state.recipe.cookingprocedure}</p>
                <p><strong>Description: </strong>{this.state.recipe.description}</p>
                <p><strong>Cooking Time: </strong>{this.state.recipe.cookingtime}</p>
                <p><strong>Cuisine: </strong>{this.state.recipe.cuisine}</p>
                <p><strong>Category: </strong>{this.state.recipe.category}</p>
                <p><strong>Calories: </strong>{this.state.recipe.calories}</p>
                <p><strong>Meal Type: </strong>{this.state.recipe.mealtype}</p>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                <div style={{padding:'10px'}}><center><button className={"button "+classLike} onClick={this.likeHandler}>
                <i className='fa fa-heart'></i>
                    <span>{likeString}</span>
                </button></center></div>
                {this.state.like?<Redirect to='/login' />:''}
            </div>);
        }
        return (
            <div style={{}}>
                {showRecipe}
            </div>
        );
    }
}

export default FullRecipe;