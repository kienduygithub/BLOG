import React, { Component } from "react";
import './Menu.scss';
import { withRouter } from "react-router-dom";
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {

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
    handleNavigate = () => {
        this.props.history.push('/')
    }
    render() {
        
        return (
            <div className="menu-container">
                <h1>Other post you may like</h1>
                <div className="posts">
                    {
                        this.posts.map(post => (
                            <div className="post" key={post.id}>
                                <div className="post-image">
                                    <img src={post.img} alt="post" />
                                </div>
                                <div className="post-content">
                                    <h2>{post.title}</h2>
                                    <button onClick={() => this.handleNavigate()}>Read more</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(Menu);