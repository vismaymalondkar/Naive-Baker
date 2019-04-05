import React, { Component } from 'react';
import { variables } from '../../containers/NaiveBaker/NaiveBaker';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
class LogoutModule extends Component {
    render()
    {
        let data={'id':1};
        axios.post('http://localhost:5000/logoutUser',data);
        variables.authenticatedUser=false;
        variables.userID=-1;
        return (<Redirect to="/recipe"/>);
    }
}

export default LogoutModule;