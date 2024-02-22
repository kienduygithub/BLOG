import React, { Component } from "react";
import './Single.scss';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import deleteImg from '../assets/delete.png';
import editImg from '../assets/edit.png';
import Menu from '../component/Menu';
import * as postService from '../services/postService';
import { convertBufferImageToBase64 } from "../utils";
import moment from 'moment';
import localization from 'moment/locale/vi';
class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {}
        }
    }
    // post = {
    //     id: 1,
    //     title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    //     desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
    //     img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    // }
    async componentDidMount() {
        const location = this.props.location;
        const state = location.state;
        const postId = state.id;
        if (postId) {
            const response = await postService.getSinglePost(postId, this.props.user.access_token);
            if (response && response.status === 'OK') {
                const givenPost = response.data;
                const imagePost = convertBufferImageToBase64(givenPost.image);
                this.setState({
                    post: {
                        id: givenPost.id,
                        title: givenPost.title,
                        desc: givenPost.description,
                        userId: givenPost.userId,
                        categoryId: givenPost.categoryId,
                        image: imagePost,
                        username: givenPost.userInfo.username,
                        userImg: givenPost.userInfo.image ?  convertBufferImageToBase64(givenPost.userInfo.image) : '',
                        updatedAt: givenPost.userInfo.updatedAt
                    }
                })
            }
        }
    }
    
    handleEditPost = () => {
        const { id, title, desc, categoryId, userId, image } = this.state.post;
        this.props.history.push(`/write?edit?id=${id}`, { id, title, desc, categoryId, userId, image, action: 'EDIT' })
    }
    handleDeletePost = async () => {
        const response = await postService.deleteSinglePost(this.state.post.id);
        if (response && response.status === 'OK') {
            this.props.history.push('/');
        } else if (response && response.status === 'ERR') {
            alert(response.message);
        }
    }
    render() {
        return (
            <div className="single-container">
                <div className="post-container">
                    <div className="post-image">
                        <img src={this.state.post.image} alt="post"/>
                    </div>
                    <div className="post-user">
                        <div className="user-image"></div>
                        <div className="user-info">
                            <span className="name" title={this.state.post.username}>{ this.state.post.username }</span>
                            <span className="time-ago">{ moment(this.state.post.updatedAt).locale('en').fromNow() }</span>
                        </div>
                        {
                            this.props.user.id === this.state.post.userId ? 
                                <div className="user-action">
                                    <img src={editImg} alt="edit" onClick={() => this.handleEditPost()}/>
                                    <img src={deleteImg} alt="delete" onClick={() => this.handleDeletePost()}/>
                                </div>
                                :
                                <></>
                        }
                    </div>
                    <div className="post-content">
                        <h1 className="post-title">
                            {this.state.post.title}
                        </h1>
                        <p className="post-desc" dangerouslySetInnerHTML={{__html: this.state.post.desc}}></p>
                    </div>
                </div>
                <Menu/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Single));