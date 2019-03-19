import React, { Component } from 'react';
import classes1 from './LoginModule.css';
import logo from '../../assets/logo.png';
class LoginModule extends Component {

    state={
        username:'',
        password:''
    }

    loginSubmitHandler = () => {
        
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
                            <input type="text" name="disabled" className={[classes1.fadeIn,classes1.forth,classes1.inputSubmitType].join(' ')} value="Login" onChange={()=>{}} onClick={this.loginSubmitHandler}/>
                        </form>
                    </div>
                </div>
            </center>
        );
    }
}

export default LoginModule;