import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import favicon from '../../favicon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Salutes.css';

export default class Salutes extends Component {
    constructor(){
        super();
        this.state = {
            salutes: []
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
                this.setState({ salutes: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const salutes = this.state.salutes.map( salute => {
            return (
                <Link to={`/post/${salute.id}`}>
                    <div className="CategoryCard" key={this.state.salutes.indexOf(salute)}>
                        <img src={salute.photo} alt="postpic"/>
                        <div className="container">
                            <h1>{salute.title}</h1>
                            <p>{salute.body.slice(0, 200)}...</p>
                        </div>
                    </div>
                </Link>
            )
        });


        return (
            <div className="Salutes">
                <NavBar/>
                <h1>Salutes To Strong Moms</h1>
                <div className="SalutesPosts">
                    { salutes }
                </div>
            </div>
        )
    }
}