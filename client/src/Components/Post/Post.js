import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';

export default class Post extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            photo: '',
            body: ''
        }
    }

    componentWillMount() {
        axios.get(`/api/post/${this.props.match.params.id}`)
            .then(res => {
                this.setState({title: res.data[0].title, photo: res.data[0].photo, body: res.data[0].body });
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="PostComponent">
                <NavBar />
                <div className="Post">

                    <h1>{this.state.title}</h1>
                   
                    <img src={this.state.photo} alt="postImage"/>
                    
                    <p>{this.state.body}</p>   

                </div>
            </div>
        )
    }
}