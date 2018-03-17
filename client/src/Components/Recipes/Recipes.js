import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import favicon from '../../favicon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Recipes extends Component {
    constructor(){
        super();
        this.state = {
            Recipes: []
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
                this.setState({ Recipes: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const Recipes = this.state.Recipes.map( recipe => {
            return (
                <Link to={`/post/${recipe.id}`}>
                <div className="postOne" key={this.state.Recipes.indexOf(recipe)}>
                    <img src={recipe.photo} alt="postpic"/>
                    <h1>{recipe.title}</h1>
                    <p>{recipe.body.slice(0, 400)}...</p>
                </div>
                </Link>
            )
        });


        return (
            <div className="Recipes">
                <NavBar/>
                { Recipes }
            </div>
        )
    }
}