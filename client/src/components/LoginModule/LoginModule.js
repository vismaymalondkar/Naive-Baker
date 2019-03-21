import React, { Component } from 'react';
import classes1 from './LoginModule.css';
import logo from '../../assets/logo.png';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { variables } from '../../containers/NaiveBaker/NaiveBaker';

class LoginModule extends Component {

    state={
        username:'',
        password:'',
        data:[],
        fl:0,
        auth:false
    }

    loginSubmitHandler = () => {
        var flag=0;
        var id=0;
        for(var i=0; i<this.state.data.length; i++)
        {
            if(this.state.data[i].username===this.state.username && this.state.password===this.state.data[i].userpass)
            {
                flag=1;
                id=this.state.data[i].userid;
            }
        }
        if(flag)
        {
            console.log('Gotcha...!');
            variables.authenticatedUser=true;
            variables.userID=id;
            this.setState({username:'',password:''});
        }
        else
        {
            this.setState({username:'',password:'',fl:1});
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/login')
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
            <center>
                <div className={[classes1.wrapper,classes1.fadeInDown].join(' ')} style={{maxWidth:'600px'}}>
                    <div id="formContent">
                        <div className={[classes1.fadeIn,classes1.first].join(' ')}>
                            <img src={logo} id="icon" alt="User Icon" style={{maxHeight:'100px'}} ></img>
                            <h2>Naive Baker</h2>
                        </div>
                        <form>
                            <input type="text" id="login" className={[classes1.fadeIn,classes1.second,classes1.inputTextType].join(' ')} name="login" placeholder="Username" value={this.state.username} onChange={(event) => this.setState({username: event.target.value})}/>
                            <input type="password" id="password" className={[classes1.fadeIn,classes1.third,classes1.inputPasswordType].join(' ')} name="login" placeholder="Password" value={this.state.password} onChange={(event) => this.setState({password: event.target.value})} />
                            {this.state.fl===1?<em style={{color:'red'}}>Enter valid Username and Password</em>:''}
                            <input type="text" name="disabled" className={[classes1.fadeIn,classes1.forth,classes1.inputSubmitType].join(' ')} value="Login" onChange={()=>{}} onClick={this.loginSubmitHandler}/>
                        </form>
                        {variables.authenticatedUser?<Redirect to="/recipe"/>:''}
                    </div>
                </div>
            </center>
        );
    }
}

export default LoginModule;