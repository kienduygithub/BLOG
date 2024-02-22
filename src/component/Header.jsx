import React, { Component } from "react";
import './Header.scss';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import * as authService from '../services/authService';
import * as actions from '../store/actions/';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelected: '',
            user: {}
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // if (nextState.state !== this.state.state) {
        //     return true;
        // } else {
        //     return false;
        // }
        if (nextState.user !== this.state.user || nextProps.user !== this.props.user) {
            return true;
        } else {
            return false;
        }
    }
    componentDidMount() {
        this.setState({
            user:  _.isEmpty(this.props.user) ? {} : this.props.user
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user !== this.props.user) {
            // console.log(prevProps.user);
            // console.log(this.props.user);
            this.setState({
                user: this.props.user
            });
        }
    }
    
    handleNavigate = (type) => {
        if (type === '/write') {
            this.setState({
                isSelected: ''
            })
            this.props.history.push(type);
        } else {
            this.props.history.push(type);
            this.setState({
                isSelected: type
            })
        }
    }
    handleLogout = async () => {
        const response = await authService.handleLogout();
        if (response && response.status === 'OK') {
            this.props.resetUser();
        }
    }
    handleLogin = () => {
        this.props.history.push('/login')
    }
    render() {
        // console.log('user', this.state.user)
        return (
            <>
                {
                    this.props.isShowHeader === false ?
                        null
                        : 
                        <div className="header-background">
                            <div className="header-container">
                                <div className="header-logo" onClick={() => this.handleNavigate('/')}>
                                    <span>Duy Blog</span>
                                </div>
                                <div className="header-nav">
                                    <div className={ this.state.isSelected === '/?cat=art' ? "nav-child active" : "nav-child" }>
                                        <span onClick={() => this.handleNavigate('/?cat=art')}>ART</span>
                                    </div>
                                    <div className={ this.state.isSelected === '/?cat=cinema' ? "nav-child active" : "nav-child" }>
                                        <span onClick={() => this.handleNavigate('/?cat=cinema')}>CINEMA</span>
                                    </div>
                                    <div className={ this.state.isSelected === '/?cat=design' ? "nav-child active" : "nav-child" }>
                                        <span onClick={() => this.handleNavigate('/?cat=design')}>DESIGN</span>
                                    </div>
                                    <div className={ this.state.isSelected === '/?cat=technology' ? "nav-child active" : "nav-child" }>
                                        <span onClick={() => this.handleNavigate('/?cat=technology')}>TECHNOLOGY</span>
                                    </div>
                                    <div className={ this.state.isSelected === '/?cat=food' ? "nav-child active" : "nav-child" }>
                                        <span onClick={() => this.handleNavigate('/?cat=food')}>FOOD</span>
                                    </div>
                                </div>
                                <div className="header-user" >
                                    {
                                        this.state.user.access_token ? 
                                            <>
                                                <div className="image"></div>
                                                <div className="username" title={this.state.user.username}>{this.state.user.username}</div>
                                                <div className="auth" onClick={() => this.handleLogout()}>Logout</div>
                                            </>
                                            
                                            :
                                            <div className="auth" onClick={() => this.handleLogin()}>Login</div>
                                    }
                                </div>
                                <div className="header-write">
                                    <span onClick={() => this.handleNavigate('/write')}>Write</span>
                                </div>
                            </div>
                        </div>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
const mapDispatchToProps = (dispatch) => ({
    resetUser: () => dispatch(actions.resetUserInfoSuccess()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));