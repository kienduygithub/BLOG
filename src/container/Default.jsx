import React, { Component } from "react";
import { connect } from "react-redux";
import Header from '../component/Header';
import Footer from '../component/Footer';
class Default extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        
        return (
            <>
                <Header isShowHeader={ this.props.isShowHeader } />
                {this.props.children}
                <Footer isShowFooter={ this.props.isShowFooter } />
            </>
        )
    }
}

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(Default);