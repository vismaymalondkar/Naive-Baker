import React,{ Component } from 'react';
import ShowRecipes from '../ShowRecipes/ShowRecipes';
import classes from './NaiveBaker.css';
import { Route, NavLink, Switch } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';
import AutoCompleteRoute from '../AutoCompleteRoute/AutoCompleteRoute';
import LoginModule from '../../components/LoginModule/LoginModule';
import SignUpModule from '../../components/SignUpModule/SignUpModule';
import LogoutModule from '../../components/LogoutModule/LogoutModule';
import logo from '../../assets/logo.png';

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
                            <li><img src={logo} id="icon" alt="User Icon" style={{maxHeight:'50px'}} ></img></li>
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
                                pathname: '/newrecipe',
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
                    <Route path="/newrecipe" component={AsyncNewPost} />
                    <Route path="/getIngredientList" component={AutoCompleteRoute} />
                    <Route path="/recipe" component={ShowRecipes} />
                    <Route path="/login" component={LoginModule} />
                    <Route path="/signup" component={SignUpModule} />
                    <Route path="/logout" component={LogoutModule} />
                </Switch>
                {/* <footer>
                    <nav className={classes.Footer} >
                        <ul>
                            <li><img src={logo} id="icon" alt="User Icon" style={{maxHeight:'50px'}} ></img></li>
                            <li><a>Naive Baker</a></li>
                            <li style={{float:'right'}}><NavLink
                                    to="/contributors"
                                    exact
                                    activeStyle={{
                                        color: '#fa923f',
                                }}>Contributors</NavLink></li>
                            <li style={{float:'right'}}><NavLink
                                    to="/about"
                                    exact
                                    activeStyle={{
                                        color: '#fa923f',
                                    }}>About</NavLink></li>
                        </ul>
                    </nav>
                </footer> */}
            </div>
        );
    }
}

export default NaiveBaker;

export var variables={
    authenticatedUser:false,
    userID:-1
}