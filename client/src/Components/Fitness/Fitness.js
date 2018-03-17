import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import favicon from '../../favicon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Fitness extends Component {
    constructor(){
        super();
        this.state = {
            Fitness: []
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
                this.setState({ Fitness: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const Fitness = this.state.Fitness.map( fitness => {
            return (
                <Link to={`/post/${fitness.id}`}>
                <div className="postOne" key={this.state.Fitness.indexOf(fitness)}>
                    <img src={fitness.photo} alt="postpic"/>
                    <h1>{fitness.title}</h1>
                    <p>{fitness.body.slice(0, 400)}...</p>
                </div>
                </Link>
            )
        });


        return (
            <div className="Fitness">
                <NavBar/>
                { Fitness }
            </div>
        )
    }
}