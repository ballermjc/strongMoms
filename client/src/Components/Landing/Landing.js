import React, { Component } from 'react';
import holdingHands from '../../holdingHands.jpg';
import baking from '../../baking.jpg';
import exercise from '../../exercise.jpg';
import kissingBaby2 from '../../kissingBaby2.jpg';
import kissingBaby3 from '../../kissingBaby3.jpg';
import talking from '../../talking.jpg';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import './Landing.css';
import NavBar from '../NavBar/NavBar';

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
                this.setState({ mostRecentPosts: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const mostRecentPosts = this.state.mostRecentPosts.map( post => {
            return (
                <div className="card" key={this.state.mostRecentPosts.indexOf(post)}>
                    <a href='/api/auth/login'>
                        <img src={post.photo} alt="postpic"/>
                        <div className="container">
                            <h1>{post.title}</h1>
                            {/* <p>{post.body.slice(0, 400)}...</p> */}
                        </div>
                    </a>
                </div>
            )
        });


        return (
            <div className="LandingComponent">
                <NavBar/>
                <div className="AuthButtonDiv"><a href='/api/auth/login'><button className="AuthButton">Login / Register</button></a></div>
                <div className="LandingTitle">
                    <h1>Strong Moms</h1>
                </div>

                <div className="CarouselDiv">
                <Carousel  dynamicHeight={true} autoPlay={true} interval={6000} transitionTime={750} infiniteLoop={true} showStatus={false} showThumbs={false}>
                    <div>
                        <img className='carouselImg' src={ kissingBaby2 } alt="kissing baby 2"/>
                        <p className="legend">Lift their kids</p>
                    </div>

                    <div>
                        <img className='carouselImg' src={ baking } alt="baking with grandma"/>
                        <p className="legend">Lift a ladle</p>
                    </div>

                    <div>
                        <img className='carouselImg' src={ exercise } alt="woman exercising"/>
                        <p className="legend">Lift some weights</p>
                    </div>

                    <div>
                        <img className='carouselImg' src={ kissingBaby3 } alt="kissing baby 3"/>
                        <p className="legend">Lift their kids</p>
                    </div>

                    <div>
                        <img className='carouselImg' src={ talking } alt="mothers talking"/>
                        <p className="legend">Lift each other</p>
                    </div>
                    
                    <div>
                        <img className='carouselImg' src={ holdingHands } alt="holding hands"/>
                        <p className="legend">Lift their corner of the world</p>
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