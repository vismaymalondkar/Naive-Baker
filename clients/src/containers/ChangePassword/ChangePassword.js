import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import '../../materializecss/materialize.css';
import { variables } from '../NaiveBaker';


class ChangePassword extends Component {

    state={
        password:'',
        checkpassword:'',
        cnt:0
    }
    
    changePasswordSubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.password!==this.state.checkpassword || this.state.password.trim()==='')
        {
            this.setState({cnt:1,password:'',checkpassword:''});
        }
        else if(this.state.password.length<8 || this.state.password.length>16)
        {
            this.setState({cnt:2,password:'',checkpassword:''});
        }
        else
        {
            let data={'id':variables.userID,'password':this.state.password};
            axios.post('http://localhost:8000/changePassword',data);
            this.props.history.replace('/recipe');
            window.location.reload();
        }
    }

    render()
    {
        return (
                <div className="row" style={{width:"30%"}}>
                    <div className="col s12 14 offset-14">
                        <div className="card z-depth-5">
                            <form>
                                <div className="card-content">
                                    <div className="form-field">
                                        <label >New Password</label>
                                        <input type="password" id="password" value={this.state.password} onChange={(event) => this.setState({password: event.target.value})}/>
                                    </div><br/>
                                    <div className="form-field">
                                        <label >Confirm New Password</label>
                                        <input type="password" id="password1" value={this.state.checkpassword} onChange={(event) => this.setState({checkpassword: event.target.value})}/>
                                    </div><br/>
                                    <center>{this.state.cnt===1?<center><em style={{color:'red'}}>Enter same password</em></center>:''}
                                    {this.state.cnt===2?<em style={{color:'red'}}>Password length should be between 8 to 16</em>:''}</center>
                                    <div className="form-field center">
                                        <button type="submit" className="btn-large blue" onClick={this.changePasswordSubmitHandler} value="Change Password">Change Password</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        );
    }
}

export default withRouter(ChangePassword);