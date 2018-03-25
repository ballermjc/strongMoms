import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import favicon from '../../favicon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Parenting.css';

export default class Parenting extends Component {
    constructor(){
        super();
        this.state = {
            Parenting: []
        }
    }

    componentWillMount() {
        let pageTitle = window.location.hash.split('/')[1];
        let capitalize = (str) => {
            let pageTitle = str.charAt(0).toUpperCase() + str.slice(1);
            return pageTitle;
        }
        const category = capitalize(pageTitle);
        console.log(category);
        axios.get(`/api/posts/${category}`)
            .then(res => {
                console.log(res.data);
                this.setState({ Parenting: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const Parenting = this.state.Parenting.map( parenting => {
            return (
                <Link to={`/post/${parenting.id}`}>
                    <div className="CategoryCard" key={this.state.Parenting.indexOf(parenting)}>
                        <img src={parenting.photo} alt="postpic"/>
                        <div className="container">
                            <h1>{parenting.title}</h1>
                            <p>{parenting.body.slice(0, 200)}...</p>
                        </div>
                    </div>
                </Link>
            )
        });


        return (
            <div className="Parenting">
                <NavBar/>
                <h1>Parenting</h1>
                <div className="ParentingPosts">
                    { Parenting }
                </div>
                
            </div>
        )
    }
}