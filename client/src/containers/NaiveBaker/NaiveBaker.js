import React,{ Component } from 'react';
import ShowRecipes from '../ShowRecipes/ShowRecipes';
import classes from './NaiveBaker.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';
import AutoCompleteRoute from '../AutoCompleteRoute/AutoCompleteRoute';

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
                                to="/getIngredientList/"
                                exact
                                activeClassName="my-active1"
                                activeStyle={{
                                    color: '#fa923f',
                                }}>Search</NavLink></li>
                            <li><NavLink
                                to="/"
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
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth ? <Route path="/new-recipe" component={AsyncNewPost} /> : null}
                    <Route path="/getIngredientList/" component={AutoCompleteRoute} />
                    <Route path="/" component={ShowRecipes} />
                </Switch>
            </div>
        );
    }
}

export default NaiveBaker;