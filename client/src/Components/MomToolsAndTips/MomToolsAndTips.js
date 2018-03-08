import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import favicon from '../../favicon.png';

export default class MomToolsAndTips extends Component {
    render() {
        return (
            <div className="MomToolsAndTips">
                <NavBar/>

                <div className="postOne">
                    <img src={favicon} alt="post"/>
                    <h1>Title</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nostrum ipsam temporibus laborum? Recusandae voluptate, aliquam facere in illum veritatis consectetur error quisquam nesciunt enim, delectus earum cumque sed possimus...</p>
                </div>

                <div className="postTwo">
                    <img src={favicon} alt="post"/>
                    <h1>Title</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nostrum ipsam temporibus laborum? Recusandae voluptate, aliquam facere in illum veritatis consectetur error quisquam nesciunt enim, delectus earum cumque sed possimus...</p>
                </div>

                <div className="postThree">
                    <img src={favicon} alt="post"/>
                    <h1>Title</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nostrum ipsam temporibus laborum? Recusandae voluptate, aliquam facere in illum veritatis consectetur error quisquam nesciunt enim, delectus earum cumque sed possimus...</p>
                </div>

            </div>
        )
    }
}