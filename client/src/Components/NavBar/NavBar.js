import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import favicon from '../../favicon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
    logout() {
        axios.get('/api/auth/logout');
        alert('You were successfully logged out.');
    }


    render() {
        return (
            <div className="nav">
                <div className="NavLeft">
                    <div className="NavLeftTop">
                        <NavLink className='NavLink' activeClassName='currentNav' to='/dashboard'>
                            Dashboard
                        </NavLink>

                        <NavLink className='NavLink' activeClassName='currentNav' to='/parenting'>
                            Parenting
                        </NavLink>

                        <NavLink className='NavLink' activeClassName='currentNav' to='/fitness'>
                            Fitness
                        </NavLink>

                        <NavLink className='NavLink' activeClassName='currentNav' to='/momToolsAndTips'>
                            Mom Tools And Tips
                        </NavLink>

                        <NavLink className='NavLink' activeClassName='currentNav' to='/recipes'>
                            Recipes
                        </NavLink>

                        <NavLink className='NavLink' activeClassName='currentNav' to='/salutes'>
                            Salutes To Strong Moms
                        </NavLink>
                    </div>

                    <div className="NavLeftBottom">
                        <img src={favicon} alt="favicon"/>
                        <h1>Strong Moms</h1>
                    </div>
                </div>

                <div className="NavRight">
                    <Link to={`/`}>
                        <div className="LogoutButtonDiv"><button className="LogoutButton" onClick={() => this.logout()}>Logout</button></div>
                    </Link>
                </div>
            </div>
        )
    }
}