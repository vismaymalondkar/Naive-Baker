import React, { Component } from 'react';
import classes1 from './SignUpModule.css';
import logo from '../../assets/logo.png';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class SignUpModule extends Component {

    state={
        username:'',
        fullname:'',
        email:'',
        password:'',
        data:[],
        fl:0,
        auth:false
    }

    componentDidMount() {
        axios.get('http://localhost:5000/signup')
            .then( response => {
                this.setState({
                data: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    signupSubmitHandler = () => {
        var flag=0;
        for(var i=0; i<this.state.data.length; i++)
        {
            if(this.state.data[i].username===this.state.username)
            {
                flag=1;
            }
        }
        if(this.state.username==='' || this.state.email==='' || this.state.password==='' || this.state.fullname==='')
            flag=2;
        if(!flag)
        {
            axios.post('/signup',this.state);
            this.setState({auth:true});
        }
        else
        {
            this.setState({username:'',email:'',password:'',fullname:'',fl:flag});
        }
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
                            <input type="text" id="login1" className={[classes1.fadeIn,classes1.second,classes1.inputTextType].join(' ')} name="login" placeholder="Username" value={this.state.username} onChange={(event) => this.setState({username: event.target.value})}/>
                            {this.state.fl===2?<em style={{color:'red'}}>Enter all the data</em>:''}
                            {this.state.fl===1?<em style={{color:'red'}}>Enter other unique Username</em>:''}
                            <input type="text" id="login2" className={[classes1.fadeIn,classes1.second,classes1.inputTextType].join(' ')} name="login" placeholder="Full Name" value={this.state.fullname} onChange={(event) => this.setState({fullname: event.target.value})}/>
                            <input type="text" id="login3" className={[classes1.fadeIn,classes1.second,classes1.inputTextType].join(' ')} name="login" placeholder="Email ID" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}/>
                            <input type="password" id="password" className={[classes1.fadeIn,classes1.third,classes1.inputPasswordType].join(' ')} name="login" placeholder="Password" value={this.state.password} onChange={(event) => this.setState({password: event.target.value})} />
                            <input type="text" name="disabled" className={[classes1.fadeIn,classes1.forth,classes1.inputSubmitType].join(' ')} value="Sign Up" onChange={()=>{}}  onClick={this.signupSubmitHandler}/>
                        </form>
                        {this.state.auth?<Redirect to="/recipe"/>:''}
                    </div>
                </div>
            </center>
        );
    }
}

export default SignUpModule;