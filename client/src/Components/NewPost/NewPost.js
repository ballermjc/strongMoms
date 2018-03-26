import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import './NewPost.css';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateTitle, updateBody, updateCategory, updatePhoto } from '../../reducer';

class NewPost extends Component {
    componentDidMount() {
        this.props.updateTitle('');
        this.props.updatePhoto('');
        this.props.updateCategory('');
        this.props.updateBody('');
    }

    addPost() {
        const body = {
            title: this.props.title,
            body: this.props.body,
            category: this.props.category,
            photo: this.props.photo
        }

        axios.post('/api/posts', body)
            
            .then(res => {
                console.log(body);
                this.props.updateTitle('');
                this.props.updatePhoto('');
                this.props.updateCategory('');
                this.props.updateBody('');
            })
            .catch(err => console.log(err));
    }

    render() {
        const { updateTitle, updateBody, updateCategory, updatePhoto } = this.props;
        return (

            <div className="NewPostComponent">
                <NavBar />
                <div className="NewPost">
                    <h1>Add a New Post</h1>
                    <form>                    
                        <input required type="text" name="title" id="title" placeholder="Title" onChange={(event) => updateTitle(event.target.value)} />
                        <input required type="text" name="photo" id="photo" placeholder="Photo URL" onChange={(event) => updatePhoto(event.target.value)} />
                        {/* <textarea required name="body" id="body" placeholder="Write your post here" onChange={(event) => updateBody(event.target.value)} />   */}
                        <select required name="category" id="category" placeholder="Category" onChange={(event) => updateCategory(event.target.value)} >
                            <option value="Parenting">Parenting</option>
                            <option value="Fitness">Fitness</option>
                            <option value="MomToolsAndTips">Mom Tools And Tips</option>
                            <option value="Recipes">Recipes</option>
                            <option value="Salutes">Salutes To Strong Moms</option>
                        </select>
                        <ReactQuill 
                            theme="snow" 
                            placeholder="Enter your blog post here"
                            value={this.props.body} 
                            onChange={(event) => updateBody(event)}
                            modules={
                                {
                                    toolbar: [
                                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                                    ['blockquote', 'code-block'],
                                  
                                    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                                    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                                    [{ 'direction': 'rtl' }],                         // text direction
                                  
                                    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                  
                                    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                                    [{ 'font': [] }],
                                    [{ 'align': [] }],
                                  
                                    ['clean']                                         // remove formatting button
                                  ]
                                  }
                                }
                                formats={
                                    [
                                        'header', 'font', 'size',
                                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                                        'list', 'bullet', 'indent',
                                        'link', 'image', 'video', 'color', 'background', 'align', 'direction'
                                      ]
                            }
                               
                        >
                        </ReactQuill>
                        <Link to={`/dashboard`}>
                        <input  className="finishButton" type="submit" onClick={() => this.addPost()} value="Finish Post" />
                        </Link>
                    </form>
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
