import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import favicon from '../../favicon.png';
import axios from 'axios';

export default class MomToolsAndTips extends Component {
    constructor(){
        super();
        this.state = {
            MomToolsAndTips: []
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
                this.setState({ MomToolsAndTips: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const MomToolsAndTips = this.state.MomToolsAndTips.map( momToolAndTip => {
            return (
                <div className="postOne" key={this.state.MomToolsAndTips.indexOf(momToolAndTip)}>
                    <img src={momToolAndTip.photo} alt="postpic"/>
                    <h1>{momToolAndTip.title}</h1>
                    <p>{momToolAndTip.body.slice(0, 400)}...</p>
                </div>
            )
        });


        return (
            <div className="MomToolsAndTips">
                <NavBar/>
                { MomToolsAndTips }
            </div>
        )
    }
}