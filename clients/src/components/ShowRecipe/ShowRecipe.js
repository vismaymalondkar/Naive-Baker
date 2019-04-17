import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../../materializecss/materialize.css';
import axios from 'axios';

class ShowRecipe extends Component {

    state = {
        recipe: []
    }

    async componentWillMount(){
        await axios.post('http://localhost:8000/recipe',{'id':this.props.id}).then((res)=>{
            let ingredientsList=[];
            let recipe=res.data[0];
            for(var i=0; i<res.data[0]['ingredients'].length;i++)
            {
                ingredientsList.push(res.data[0]['ingredients'][i].ingredientname);
            }
            recipe['ingredients']=ingredientsList;
            this.setState({recipe:recipe},console.log(recipe));
        });
    }

    render(){
        let missing =null;
        //console.log(this.props.ingredients);
        if(this.props.ingredients && this.state.recipe.ingredients)
        {
            missing=this.state.recipe.ingredients.filter(ingredient => !this.props.ingredients.find(item => item === ingredient));
            console.log("missing", missing);
            // missing = missing.map(item => <p>{item}</p>);

        }
        return (
            <div className="card">
                <div className="card-image" style={{width:this.props.width}}>
                    <img className="activator" alt="Check Your Connection" src={this.props.photo} />
                </div>
                <div className="card-content" style={{width:this.props.width}}>
                    <p style={{width:'100%',overflow:'auto'}}><span className="card-title activator grey-text text-darken-4">{this.props.title}</span></p>
                    {missing && missing.length>0?<p><strong style={{color:'red'}}>Missing: </strong>{missing.join(', ')}</p>:''}
                    <p><NavLink to={"/recipe/fullrecipe/"+this.props.id} exect>Open<i className="material-icons grey-text text-darken-4 right">more_vert</i></NavLink></p>
                </div>
            </div>
        );
    }
}

export default ShowRecipe;