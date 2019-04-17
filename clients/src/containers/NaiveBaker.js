import React,{ Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import logo from '../assets/logo.png';
import '../materializecss/materialize.css';

import LoginModule from '../components/LoginModule/LoginModule';
import SignUpModule from '../components/SignUpModule/SignUpModule';
import ShowRecipes from './ShowRecipes/ShowRecipes';
import FullRecipe from '../components/FullRecipe/FullRecipe';
import LogoutModule from '../components/LogoutModule/LogoutModule';
import DropDown from './DropDown/DropDown';
import ChangePassword from './ChangePassword/ChangePassword';
import NewRecipe from './NewRecipe/NewRecipe';
import Search from '../components/Search/Search';
class NaiveBaker extends Component {

    state={
        auth:false,
        drop:false
    }

    componentWillMount(){
        axios.get('http://localhost:8000/loggedInUser')
            .then( response => {
                if(response.data.length !== 0){
                    variables.userID=response.data[0].userid;
                    variables.authenticatedUser=true;
                    variables.userFirstName=response.data[0].firstname;
                    variables.userType=response.data[0].usertype;
                    console.log(variables);
                    this.setState({auth:true});
                }
        }).catch(function (error) {
            console.log(error);
        });
    }

    dropDownMenu = () => {
        this.setState({drop:!this.state.drop});
    }

    render () {
        let dropDown=null;
        if(this.state.drop)
        {
            dropDown=(<DropDown/>);
        }

        return (
            <div>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
                <nav>
                    <div className="nav-wrapper blue">
                        <ul id="nav-mobile" className="left hide-on-med-and-down">
                            <li><NavLink to="/recipe"><img className="brand-logo" src={logo} alt="Naive Baker" style={{height:'64px',padding:'2px'}} /></NavLink></li>
                        </ul>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><NavLink to="/search" exect ><i className="small material-icons">search</i></NavLink></li>
                            <li><NavLink to="/recipe" activeStyle={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>Recipes</NavLink></li>
                            {variables.userType==='Chef'?<li><NavLink to="/newrecipe" exect activeStyle={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>New Recipe</NavLink></li>:null}
                            {!this.state.auth?<li><NavLink to="/login" exect activeStyle={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>Login</NavLink></li>:''}
                            {!this.state.auth?<li><NavLink to="/signup" exect activeStyle={{backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>Sign Up</NavLink></li>:''}
                            {this.state.auth?<li><a  href="#!"><div onClick={this.dropDownMenu}>Hi, {variables.userFirstName}<i className="material-icons right">arrow_drop_down</i></div></a></li>:''}
                        </ul>
                    </div>
                </nav>
                {dropDown}
                <Switch>
                    <Route path="/recipe/fullrecipe/:id" component={FullRecipe} />
                    <Route path="/recipe" component={ShowRecipes} />
                    <Route path="/login" component={LoginModule} />
                    <Route path="/signup" component={SignUpModule} />
                    <Route path="/logout" component={LogoutModule} />
                    <Route path="/changepassword" component={ChangePassword} />
                    <Route path="/newrecipe" component={NewRecipe} />
                    <Route path="/search" component={Search} />
                    <Redirect from='*' to="/recipe" />
                </Switch>
            </div>
        );
    }
}

export default NaiveBaker;

export var variables={
    authenticatedUser:false,
    userID:-1,
    userFirstName:'',
    userType:''
}