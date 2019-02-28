import React, { Component } from 'react'

export default class Ingredient extends Component {
    state={
        isMarked:false,
        IngredientList:[]
    }

    AddIngredient(item){
        var x=this.state.IngredientList;
        x.push(item);
        if(this.state.isMarked===true)
            this.setState({IngredientList:x});
    }

    render() {
        return (
        <div>
            <button onClick={()=>{this.AddIngredient(this.props.item)}}>Add</button>
        </div>
        )
    }
}
