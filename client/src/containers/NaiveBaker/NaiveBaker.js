import React,{ Component } from 'react';
import ShowRecipes from '../ShowRecipes/ShowRecipes';
import classes from './NaiveBaker.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';
import AutoCompleteRoute from '../AutoCompleteRoute/AutoCompleteRoute';
import LoginModule from '../../components/LoginModule/LoginModule';
import SignUpModule from '../../components/SignUpModule/SignUpModule';

const AsyncNewPost = asyncComponent(() => {
    return import('../NewRecipe/NewRecipe');
});

class NaiveBaker extends Component {

    state = {
        auth: true
    }

    render () {
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
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-recipe',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}
                            activeStyle={{
                                color: '#fa923f',
                            }}>New Recipe</NavLink></li>
                            <li style={{float:'right'}}><NavLink
                                to="/signup"
                                exact
                                activeClassName="myclassname"
                                activeStyle={{
                                    color: '#fa923f',
                                }}>Sign Up</NavLink></li>
                            <li style={{float:'right'}}><NavLink
                                to="/login"
                                exact
                                activeClassName="my2"
                                activeStyle={{
                                    color: '#fa923f',
                                }}>Login</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth ? <Route path="/new-recipe" component={AsyncNewPost} /> : <Route path="/login" component={LoginModule} />}
                    <Route path="/getIngredientList" component={AutoCompleteRoute} />
                    <Route path="/recipe" component={ShowRecipes} />
                    <Route path="/login" component={LoginModule} />
                    <Route path="/signup" component={SignUpModule} />
                </Switch>
            </div>
        );
    }
}

export default NaiveBaker;