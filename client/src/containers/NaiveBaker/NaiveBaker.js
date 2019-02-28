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
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/search/"
                                exact
                                activeClassName="my-active1"
                                activeStyle={{
                                    color: '#fa923f',
                                }}>Search</NavLink></li>
                            <li><NavLink
                                to="/users/"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/search/" component={AutoCompleteRoute} />
                    <Route path="/users" component={ShowRecipes} />
                </Switch>
            </div>
        );
    }
}

export default NaiveBaker;