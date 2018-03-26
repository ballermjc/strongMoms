import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import './EditPost.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateTitle, updateBody, updateCategory, updatePhoto } from '../../reducer';

class EditPost extends Component {
    
    componentWillMount() {
        axios.get(`/api/post/${this.props.match.params.id}`)
            .then(res => {
                this.props.updateTitle(res.data[0].title);
                this.props.updateBody(res.data[0].body);
                this.props.updateCategory(res.data[0].category);
                this.props.updatePhoto(res.data[0].photo);
            })
            .catch(err => console.log(err));
    }

    editPost() {
        const body = {
            title: this.props.title,
            body: this.props.body,
            category: this.props.category,
            photo: this.props.photo
        }

        axios.patch(`/api/post/${this.props.match.params.id}`, body)
            .then(res => {
                console.log(res.data);
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
            <div className="EditPostComponent">
                <NavBar />
                <div className="EditPost">
                    <h1>Edit Post</h1>
                    <form>
                        <input required type="text" name="title" id="title" value={this.props.title} onChange={(event) => updateTitle(event.target.value)} />
                        <input required type="text" name="photo" id="photo" value={this.props.photo} onChange={(event) => updatePhoto(event.target.value)} />
                        {/* <input required type="text" name="body" id="body" value={this.props.body} onChange={(event) => updateBody(event.target.value)} />   */}
                        <select required name="category" id="category" value={this.props.category} onChange={(event) => updateCategory(event.target.value)} >
                            <option value="Parenting">Parenting</option>
                            <option value="Fitness">Fitness</option>
                            <option value="MomToolsAndTips">Mom Tools And Tips</option>
                            <option value="Recipes">Recipes</option>
                            <option value="Salutes">Salutes To Strong Moms</option>
                        </select>
                        <ReactQuill 
                            theme="snow" 
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
                        <Link to={`/post/${this.props.match.params.id}`}>
                        <input type="submit" onClick={() => this.editPost()} value="Save Changes" />
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

export default connect(mapStateToProps, {updateTitle, updateBody, updateCategory, updatePhoto})(EditPost);