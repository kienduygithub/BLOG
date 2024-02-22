import React, { Component } from "react";
import './Login.scss';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import * as authService from '../services/authService';
import * as actions from '../store/actions'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
    handleNavigateRegister = () => {
        this.props.history.push('/register')
    }
    handleSubmit = async () => {
        let { email, password } = this.state;
        const response = await authService.handleLogin({ email, password });
        if (response && response.status === 'OK') {
            localStorage.setItem('access_token', response.data.access_token)
            this.props.saveUserInfoLogin(response.data);
            this.props.history.push('/');
            this.setState({
                isError: ''
            })
        } else if (response && response.status === 'ERR') {
            this.setState({
                isError: response.message
            })
        }
    }
    render() {
        
        return (
            <div className="login-container">
                <form>
                    <h1 className="form-title">
                        Sign in
                    </h1>
                    <div className="form-group">
                        <input type="text" placeholder="email" className="form-input" onChange={(e) => this.handleOnChangeInput(e, 'email')}/>
                    </div>
                    <div className="form-group">
                        <input type="password" placeholder="password" className="form-input" onChange={(e) => this.handleOnChangeInput(e, 'password')}/>
                    </div>
                    {
                        this.state.isError.length > 0 ? 
                            <p>{this.state.isError}</p>
                            :
                            <p style={{color: 'white'}}>Không có lỗi</p>
                    }
                    <button type="button" onClick={() => this.handleSubmit()}>Sign in</button>
                    <span className="dont-have-account">
                        Don't you have an account?
                        <span className="navigate-to-register" onClick={() => this.handleNavigateRegister()}>
                            Sign up
                        </span>
                    </span>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({
    saveUserInfoLogin: (data) => dispatch(actions.saveUserInfoSuccess(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));