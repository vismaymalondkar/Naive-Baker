import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { variables } from '../../containers/NaiveBaker';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class LogoutModule extends Component {
    render()
    {
        let data={'id':1};
        axios.post('http://localhost:8000/logoutUser',data);
        variables.authenticatedUser=false;
        variables.userID=-1;
        this.props.history.replace('/recipe');
        window.location.reload();
        return (<Redirect to="/recipe"/>);
    }
}

export default withRouter(LogoutModule);