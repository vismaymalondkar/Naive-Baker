import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../../materializecss/materialize.css';
import './LoginModule.css';
import axios from 'axios';
import variables from '../../containers/NaiveBaker';
class LoginModule extends Component {

    state={
        username:'',
        password:'',
        data:[],
        fl:0,
        auth:false
    }

    loginSubmitHandler = (event) => {
        event.preventDefault();
        var flag=0;
        var id=0;
        let firstname='';
        for(var i=0; i<this.state.data.length; i++)
        {
            if(this.state.data[i].username===this.state.username && this.state.password===this.state.data[i].userpass)
            {
                flag=1;
                id=this.state.data[i].userid;
                firstname=this.state.data[i].userfirstname;
            }
        }
        if(flag)
        {
            let data={'id':id,'userfirstname':firstname};
            console.log('Gotcha...!');
            axios.post('http://localhost:8000/loggedInUser',data);
            variables.authenticatedUser=true;
            variables.userID=id;
            variables.userFirstName=firstname;
            this.setState({username:'',password:''});
            this.props.history.replace('/recipe');
            window.location.reload();
        }
        else
        {
            this.setState({username:'',password:'',fl:1});
        }
    }

    componentWillMount() {
        axios.get('http://localhost:8000/login')
            .then( response => {
                this.setState({
                data: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render()
    {
        return (
                <div className="row wrapper fadeInDown" style={{width:"30%"}}>
                    <div className="col s12 14 offset-14">
                        <div className="card z-depth-5">
                            <div className="card-action blue white-text center">
                                <h2>Naive Baker</h2>
                            </div>
                            <form>
                                <div className="card-content">
                                    <div className="form-field">
                                        <label >Username</label>
                                        <input type="text" id="username" value={this.state.username} onChange={(event) => {if(event.target.value.slice(-1)!==' ') this.setState({username: event.target.value})} } />
                                    </div> <br/>
                                    <div className="form-field">
                                        <label >Password</label>
                                        <input type="password" id="password" value={this.state.password} onChange={(event) => {if(event.target.value.slice(-1)!==' ')this.setState({password: event.target.value})}} />
                                    </div><br/>
                                    <center>{this.state.fl===1?<em style={{color:'red'}}>Enter valid Username and Password</em>:''}</center>
                                    <div className="form-field center">
                                        {/* <button type="submit" className="btn-large waves-effect waves-light blue" onClick={this.loginSubmitHandler} value="Login">Login</button> */}
                                        <input type="submit" name="disabled" className="fadeIn forth inputSubmitType center" value="Login" onChange={()=>{}} onClick={this.loginSubmitHandler}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        );
    }
}

export default withRouter(LoginModule);