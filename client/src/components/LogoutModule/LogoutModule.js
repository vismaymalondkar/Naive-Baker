import React, { Component } from 'react';
import { variables } from '../../containers/NaiveBaker/NaiveBaker';
import { Redirect } from 'react-router-dom';

class LogoutModule extends Component {
    render()
    {
        variables.authenticatedUser=false;
        variables.userID=-1;
        return (<Redirect to="/recipe"/>);
    }
}

export default LogoutModule;