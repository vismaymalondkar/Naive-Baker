import React,{ Component } from 'react';
import ShowRecipes from '../ShowRecipes/ShowRecipes';
import classes from './NaiveBaker.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';
import AutoCompleteRoute from '../AutoCompleteRoute/AutoCompleteRoute';
import LoginModule from '../../components/LoginModule/LoginModule';
import SignUpModule from '../../components/SignUpModule/SignUpModule';
import LogoutModule from '../../components/LogoutModule/LogoutModule';

const AsyncNewPost = asyncComponent(() => {
    return import('../NewRecipe/NewRecipe');
});

class NaiveBaker extends Component {
    render () {

        const notAuth1=(<li style={{float:'right'}}><NavLink
                            to="/signup"
                            exact
                            activeClassName="myclassname"
                            activeStyle={{
                                color: '#fa923f',
                        }}>Sign Up</NavLink></li>);

        const notAuth2=(<li style={{float:'right'}}><NavLink
                            to="/login"
                            exact
                            activeClassName="my2"
                            activeStyle={{
                                color: '#fa923f',
                        }}>Login</NavLink> </li>);

        return (
            <div className={classes.Blog}>
                <header>
                    <nav className={classes.Header}> 
                        <ul>
                            <li><NavLink
                                to="/getIngredientList"
                                exact
                                activeClassName="my-active1"
                                activeStyle={{
                                    color: '#fa923f',
                                }}>Search</NavLink></li>
                            <li><NavLink
                                to="/recipe"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                }}>Recipes</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-recipe',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}
                            activeStyle={{
                                color: '#fa923f',
                            }}>New Recipe</NavLink></li>
                            {!variables.authenticatedUser?notAuth1:(<li style={{float:'right'}}><NavLink
                            to="/logout"
                            exact
                            activeClassName="myclassname"
                            activeStyle={{
                                color: '#fa923f',
                            }}>Logout</NavLink></li>)}
                            {!variables.authenticatedUser?notAuth2:''}
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/new-recipe" component={AsyncNewPost} />
                    <Route path="/getIngredientList" component={AutoCompleteRoute} />
                    <Route path="/recipe" component={ShowRecipes} />
                    <Route path="/login" component={LoginModule} />
                    <Route path="/signup" component={SignUpModule} />
                    <Route path="/logout" component={LogoutModule} />
                </Switch>
            </div>
        );
    }
}

export default NaiveBaker;

export var variables={
    authenticatedUser:false
}