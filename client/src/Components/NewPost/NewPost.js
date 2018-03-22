import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateTitle, updateBody, updateCategory, updatePhoto } from '../../reducer';

class NewPost extends Component {
    addPost() {
        const body = {
            title: this.props.title,
            body: this.props.body,
            category: this.props.category,
            photo: this.props.photo
        }

        axios.post('/api/posts', body)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    render() {
        const { updateTitle, updateBody, updateCategory, updatePhoto } = this.props;
        return (

            <div className="NewPostComponent">
                <NavBar />
                <div className="NewPost">

                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" onChange={(event) => updateTitle(event.target.value)} />
                    <label htmlFor="photo">Photo URL</label>
                    <input type="text" name="photo" id="photo" onChange={(event) => updatePhoto(event.target.value)} />
                    <label htmlFor="body">Body</label>
                    <input type="text" name="body" id="body" onChange={(event) => updateBody(event.target.value)} />  
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" onChange={(event) => updateCategory(event.target.value)} >
                        <option value="Parenting">Parenting</option>
                        <option value="Fitness">Fitness</option>
                        <option value="MomToolsAndTips">Mom Tools And Tips</option>
                        <option value="Recipes">Recipes</option>
                        <option value="Salutes">Salutes To Strong Moms</option>
                    </select>
                    <Link to={`/dashboard`}>
                    <button onClick={() => this.addPost()}>Add Post</button>
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { title, body, category, photo } = state;
    return {
        title,
        body,
        category,
        photo
    };
}

export default connect(mapStateToProps, {updateTitle, updateBody, updateCategory, updatePhoto})(NewPost);