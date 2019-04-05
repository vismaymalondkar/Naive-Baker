import React from 'react';
import Checkbox from './Checkbox';
import classes from './CheckboxContainer.css';

class CheckboxContainer extends React.Component 
{
  constructor(props) 
  {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) 
  {
    let item = this.props.items.filter(item => item[this.props.id] === e.target.name)[0];
    item.isChecked = e.target.checked;
    this.props.updateSelected({identifier: this.props.identifier, item: item});
  }

  render() {
    const header = <div className = {classes.checkboxcontainerHeader}>{this.props.placeholder}</div>;

    return (
      <div className = {classes.checkboxcontainerContainer}>
        {header}
        {this.props.items.map(item => (
            <label key = {item[this.props.id]} className = {classes.checkboxLabel}>
                {item[this.props.name]}
                <Checkbox 
                    name = {item[this.props.id]} 
                    checked = {item.isChecked} 
                    onChange = {this.handleChange} 
                />
            </label>
          ))}
      </div>
    );
  }
}

export default CheckboxContainer;