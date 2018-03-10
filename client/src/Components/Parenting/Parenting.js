import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import favicon from '../../favicon.png';
import axios from 'axios';

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
                <div className="postOne" key={this.state.Parenting.indexOf(parenting)}>
                    <img src={parenting.photo} alt="postpic"/>
                    <h1>{parenting.title}</h1>
                    <p>{parenting.body.slice(0, 400)}...</p>
                </div>
            )
        });


        return (
            <div className="Parenting">
                <NavBar/>
                { Parenting }
            </div>
        )
    }
}