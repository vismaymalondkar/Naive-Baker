import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import '../../materializecss/materialize.min.css';
import './SignUpModule.css';
import logo from '../../assets/logo.png';
import axios from 'axios';

class SignUpModule extends Component {

    state={
        username:'',
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        checkpassword:'',
        data:[],
        fl:0,
        userType:'Regular',
        auth:false
    }

    componentWillMount() {
        axios.get('http://localhost:8000/signup')
            .then( response => {
                this.setState({
                data: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    signupSubmitHandler = async(event) => {
        event.preventDefault();
        var flag=0;
        for(var i=0; i<this.state.data.length; i++)
        {
            if(this.state.data[i].username===this.state.username || this.state.data[i].email===this.state.email)
            {
                flag=1;
            }
        }
        if(this.state.password.length<8 || this.state.password.length>16) flag=4;
        if(this.state.username.length<6) flag=5;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(this.state.email) === false){
            flag=2;
        }
        if(this.state.username.trim()==='' || this.state.email.trim()==='' || this.state.password.trim()==='' || this.state.firstname.trim()==='' || this.state.lastname.trim()==='')
            flag=2;
        if(this.state.password!==this.state.checkpassword)
            flag=3;
        if(!flag)
        {
            await axios.post('http://localhost:8000/signup',this.state);
            this.setState({auth:true});
            this.props.history.push('/login');
            window.location.reload();
        }
        else
        {
            this.setState({username:'',email:'',password:'',firstname:'',lastname:'',checkpassword:'',fl:flag});
        }
    }

    render()
    {
        return (
        <div>
            <div className="row wrapper fadeInDown" style={{width:"60%"}}>
                    <div className="col s12 14 offset-14">
                        <div className="card z-depth-5">
                            <div className="card-action blue white-text center">
                                <img className="brand-logo" src={logo} alt=" " style={{height:'150px',float:'left',paddingLeft:'100px',paddingBottom:'40px'}} />
                                <h2>Naive Baker</h2>
                            </div>
                            <form>
                                <div className="card-content">
                                    <div className="form-field col s6">
                                        <label >First Name</label>
                                        <input type="text" id="username" value={this.state.firstname} onChange={(event) => this.setState({firstname: event.target.value})}/>
                                    </div>
                                    <div className="form-field col s6">
                                        <label >Last Name</label>
                                        <input type="text" id="username4" value={this.state.lastname} onChange={(event) => this.setState({lastname: event.target.value})}/>
                                    </div>
                                    <div className="form-field col s12">
                                        <label >Username</label>
                                        <input type="text" id="username1" value={this.state.username} onChange={(event) => {if(event.target.value.slice(-1)!==' ') this.setState({username: event.target.value})} }/>
                                    </div><br/>
                                    <div className="form-field col s12">
                                        <label >Email ID</label>
                                        <input type="text" id="username2" value={this.state.email} onChange={(event) => {if(event.target.value.slice(-1)!==' ')this.setState({email: event.target.value})}}/>
                                    </div><br/>
                                    <div className="form-field col s12">
                                        <label >Password</label>
                                        <input type="password" id="password" value={this.state.password} onChange={(event) => {if(event.target.value.slice(-1)!==' ')this.setState({password: event.target.value})}}/>
                                    </div><br/>
                                    <div className="form-field col s12">
                                        <label >Confirm Password</label>
                                        <input type="password" id="password1" value={this.state.checkpassword} onChange={(event) => {if(event.target.value.slice(-1)!==' ')this.setState({checkpassword: event.target.value})}}/>
                                    </div><br/>
                                    <center>
                                        <div className="switch" style={{padding:'10px'}}>
                                            <label>
                                            Regular User
                                            <input type="checkbox" onClick={(e)=>{this.setState({userType:e.target.checked?'Chef':'Regular'});}} />
                                            <span className="lever"></span>
                                            Chef
                                            </label>
                                        </div>
                                    </center>
                                    <center>{this.state.fl===2?<em style={{color:'red'}}>Enter Valid Data</em>:''}
                                    {this.state.fl===4?<em style={{color:'red'}}>Password length should be between 8 to 16</em>:''}
                                    {this.state.fl===5?<em style={{color:'red'}}>Username length should be greater than 6</em>:''}
                                    {this.state.fl===3?<em style={{color:'red'}}>The password and confirmation password do not match</em>:''}
                                    {this.state.fl===1?<em style={{color:'red'}}>Enter other unique Username or EmailID</em>:''}</center>
                                    <div className="form-field center">
                                        {/* <button type="submit" className="btn-large blue" onClick={this.signupSubmitHandler} value="Login">Sign Up</button> */}
                                        <input type="submit" name="disabled" className="fadeIn forth inputSubmitType center" value="Sign Up" onChange={()=>{}} onClick={this.signupSubmitHandler}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SignUpModule);