import React, { Component } from 'react';
import holdingHands from '../../holdingHands.jpg';
import kissingBaby from '../../kissingBaby.jpg';
import kissingBaby2 from '../../kissingBaby2.jpg';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';

export default class Landing extends Component {
    constructor(){
        super();
        this.state = {
            mostRecentPosts: []
        }
    }

    componentWillMount() {
        axios.get(`/api/posts/mostRecent`)
            .then(res => {
                console.log(res.data);
                this.setState({ mostRecentPosts: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const mostRecentPosts = this.state.mostRecentPosts.map( post => {
            return (
                <div className="postOne" key={this.state.mostRecentPosts.indexOf(post)}>
                    <img src={post.photo} alt="postpic"/>
                    <h1>{post.title}</h1>
                    <p>{post.body.slice(0, 400)}...</p>
                </div>
            )
        });


        return (
            <div className="LandingComponent">
                <div className="AuthButtonDiv"><a href='http://localhost:3001/api/auth/login'><button className="AuthButton">Login / Register</button></a></div>
                <div className="LandingTitle">
                    <h1>Strong Moms</h1>
                </div>

                <div className="CarouselDiv">
                <Carousel width dynamicHeight={true} autoPlay={true} interval={5000} transitionTime={750} infiniteLoop={true} showStatus={false} showThumbs={false}>
                    <div>
                        <img className='carouselImg' src={ holdingHands } alt="holding hands"/>
                        <p className="legend">Insert Text Here</p>
                    </div>
                    <div>
                        <img className='carouselImg' src={ kissingBaby } alt="kissing baby"/>
                        <p className="legend">Insert Text Here</p>
                    </div>
                    <div>
                        <img className='carouselImg' src={ kissingBaby2 } alt="kissing baby 2"/>
                        <p className="legend">Insert Text Here</p>
                    </div>
                </Carousel>
                </div>
                <div className="threePosts">
                    {mostRecentPosts}
                </div>
                
            </div>
        )
    }
}