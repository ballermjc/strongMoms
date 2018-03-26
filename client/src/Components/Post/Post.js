import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import './Post.css';

export default class Post extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            photo: '',
            body: '',
            postID: ''
        }
    }

    componentWillMount() {
        axios.get(`/api/post/${this.props.match.params.id}`)
            .then(res => {
                this.setState({title: res.data[0].title, photo: res.data[0].photo, body: res.data[0].body });
            })
            .catch(err => console.log(err));
    }

    deletePost() {
        axios.delete(`/api/post/${this.props.match.params.id}`)
            .then(res => {
                console.log('Post deleted, ', res.data);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="PostComponent">
                <NavBar />
                <div className="PostArea">

                    <h1>{this.state.title}</h1>
                   
                    <img src={this.state.photo} alt="postImage"/>
                    
                    <p>{renderHTML(this.state.body)}</p>
                    <Link to={`/posts/edit/${this.props.match.params.id}`}>
                    <button className="editButton">Edit Post</button>
                    </Link>

                    <Link to={`/dashboard`}>
                    <button className="deleteButton" onClick={() => this.deletePost()}>Delete Post</button>
                    </Link>
                </div>
            </div>
        )
    }
}