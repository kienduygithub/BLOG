import React, { Component } from "react";
import './Home.scss';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import * as postService from '../services/postService';
import { Buffer } from 'buffer';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            category: ''
        }
    }
    posts = [
        {
            id: 1,
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
            img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: 2,
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
            img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: 3,
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
            img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
        {
            id: 4,
            title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
            img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        },
    ]
    convertBinaryBufferToBase64 = (fileImg) => {
        const buffer = new Buffer(fileImg, 'base64').toString('binary');
        return buffer;
    }
    
    async componentDidMount() {
        const category = this.props.location.search ? this.props.location.search : '';
        const allPosts = await postService.getAllPosts(category);
        if (allPosts && allPosts.status === 'OK') {
            const posts = allPosts.data.map((post) => ({
                id: post.id,
                title: post.title,
                desc: post.description,
                image: post.image ? this.convertBinaryBufferToBase64(post.image) : '',
                categoryId: post.categoryId
            }))
            this.setState({
                posts: posts.length > 0 ? posts : []
            })
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.location !== this.props.location) {
            const category = this.props.location.search ? this.props.location.search : '';
            const allPosts = await postService.getAllPosts(category);
            if (allPosts && allPosts.status === 'OK') {
                const posts = allPosts.data.map((post) => ({
                    id: post.id,
                    title: post.title,
                    desc: post.description,
                    image: post.image ? this.convertBinaryBufferToBase64(post.image) : '',
                    categoryId: post.categoryId
                }))
                this.setState({
                    posts: posts.length > 0 ? posts : []
                })
            }
        }
    }
    handleNavigate = (postId) => {
        this.props.history.push(`/post/${postId}`, {id: postId})
    }
    render() {
        return (
            <div className="home-container">
                <div className="posts">
                    {
                        this.state.posts.length > 0 &&
                        this.state.posts.map((post) => (
                            <div className="post-info" key={post.id}>
                                <div className="post-image" style={{backgroundImage: `url(${post.image})`}}>
                                    {/* <img src={post.image} alt="post" /> cũng được*/}
                                </div>
                                <div className="post-content">
                                    <h1 className="post-title" onClick={() => this.handleNavigate(post.id)}>{post.title}</h1>
                                    <div className="post-desc">
                                        <p dangerouslySetInnerHTML={{__html: post.desc}}></p>
                                    </div>
                                    <button className="btn-more">Read more</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));