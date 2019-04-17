import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../materializecss/materialize.css';
import './DropDown.css';

class DropDown extends React.Component {

    render(){
        return (<div className="vertical-menu" style={{position:'fixed',zIndex:'1000',right:'0'}}>
                    <NavLink to="/changepassword" exect >Change Password</NavLink>
                    <NavLink to="/logout" exect >Logout</NavLink>
                </div>);
    }
}

export default DropDown;