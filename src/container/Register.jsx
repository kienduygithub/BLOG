import React, { Component } from "react";
import './Register.scss';
import { withRouter } from "react-router-dom";
import * as authService from "../services/authService";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            isError: ''
        }
    }
    handleOnChangeInput = (e, type) => {
        this.setState({
            [type]: e.target.value
        })
    } 
    handleNavigateLogin = () => {
        this.props.history.push('/login')
    }
    handleSubmit = async () => {
        const { username, email, password } = this.state;
        const response = await authService.handleSignUp({ username, email, password });
        if (response && response.status === 'OK') {
            alert(response.message);
            this.setState({
                username: '',
                email: '',
                password: '',
                isError: ''
            })
        } else if (response && response.status === 'ERR') {
            this.setState({
                password: '',
                isError: response.message
            })
        }
    }
    render() {
        
        return (
            <div className="register-container">
                <form>
                    <h1 className="form-title">
                        Sign up
                    </h1>
                    <div className="form-group">
                        <input type="text" placeholder="username" value={this.state.username} className="form-input" onChange={(e) => this.handleOnChangeInput(e, 'username')}/>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="email" value={this.state.email} className="form-input" onChange={(e) => this.handleOnChangeInput(e, 'email')}/>
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="password" className="form-input" value={this.state.password} onChange={(e) => this.handleOnChangeInput(e, 'password')}/>
                    </div>
                    {
                        this.state.isError.length > 0 ? 
                            <p>{this.state.isError}</p>
                            :
                            <p style={{color: 'white'}}>Không có lỗi</p>
                    }
                    <button type="button" onClick={() => this.handleSubmit()}>Sign up</button>
                    <span className="dont-have-account">
                        Do you have an account?
                        <span className="navigate-to-register" onClick={() => this.handleNavigateLogin()}>
                            Sign in
                        </span>
                    </span>
                </form>
            </div>
        )
    }
}

export default withRouter(Register);