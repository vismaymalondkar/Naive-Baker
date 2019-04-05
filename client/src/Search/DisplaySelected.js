import React, { Component } from 'react';
import DisplaySelectedItem from './DisplaySelectedItem';
import classes from './DisplaySelected.css'

class DisplaySelected extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {  
            
        };

        this.onRemove = this.onRemove.bind(this);
    }

    onRemove(e)
    {
        //console.log(this.props.identifier);
        this.props.removeSelected({addList: this.props.addList, removeList: this.props.removeList, id: this.props.id, value: e.target.id});
    }

    render() 
    { 
        const items = this.props.items.length === 0 ? [] :
                        <div className = {classes.displaySelectedList}>
                            {this.props.items.map(item => 
                                <DisplaySelectedItem 
                                    name = {item[this.props.name]}
                                    id = {item[this.props.id]}
                                    key = {item[this.props.id]}
                                    onRemove = {this.onRemove}
                                />)}
                        </div>;

        const emptySection = <div className = {classes.displaySelectedEmptySection}>Selected Ingredient will appear here.</div>;

        return ( 
            <div className = {classes.displaySelectedContainer}>
                <div className = {classes.displaySelectedHeader}>{this.props.placeholder}</div>
                {items.length !== 0 ? items : emptySection}
            </div>
        );
    }
}
 
export default DisplaySelected;