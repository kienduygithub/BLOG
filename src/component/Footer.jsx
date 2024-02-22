import React, { Component, memo } from "react";
import './Footer.scss';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    handleNavigate = () => {
        this.props.history.push('/');
    }
    render() {
        
        return (
            <>
                {
                    this.props.isShowFooter === false? 
                        null 
                        :
                        <div className="footer-container">
                            <div className="footer-logo" onClick={() => this.handleNavigate()}>
                                <span>Duy Blog</span>
                            </div>
                            <div className="footer-text">Made with ♥ <b>Kiến Duy</b></div>
                        </div>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(memo(withRouter(Footer)));