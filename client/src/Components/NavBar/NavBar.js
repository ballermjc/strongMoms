import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import favicon from '../../favicon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './NavBar.css';
import $ from 'jquery';
import FontAwesome from 'react-fontawesome';

export default class NavBar extends Component {
    logout() {
        axios.get('/api/auth/logout');
        alert('You were successfully logged out.');
    }

    classToggle() {
        const navs = document.querySelectorAll('.Navbar__Items')
        
        navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
    }
        

    render() {
        
        
        return (

        <div className="Navbar">
            <div className="Navbar__Link Navbar__Link-brand">
                <img src={favicon} alt="favicon"/>
            </div>
            <div onClick={() => this.classToggle()} className="Navbar__Link Navbar__Link-toggle">
                <FontAwesome name="bars" size="2x"/>
            </div>
            <nav className="Navbar__Items">
                <div className="Navbar__Link Navbar__Border">
                    <NavLink className='NavLink' activeClassName='currentNav' to='/dashboard'>
                        Dashboard
                    </NavLink>
                </div>
                <div className="Navbar__Link Navbar__Border">
                    <NavLink className='NavLink' activeClassName='currentNav' to='/parenting'>
                        Parenting
                    </NavLink>
                </div>
                <div className="Navbar__Link Navbar__Border">
                    <NavLink className='NavLink' activeClassName='currentNav' to='/fitness'>
                        Fitness
                    </NavLink>
                </div>
                <div className="Navbar__Link Navbar__Border">
                    <NavLink className='NavLink' activeClassName='currentNav' to='/momToolsAndTips'>
                        Tools And Tips
                    </NavLink>
                </div>
                <div className="Navbar__Link Navbar__Border">
                    <NavLink className='NavLink' activeClassName='currentNav' to='/recipes'>
                        Recipes
                    </NavLink>
                </div>
                <div className="Navbar__Link Navbar__Border">
                    <NavLink className='NavLink' activeClassName='currentNav' to='/salutes'>
                        Salutes
                    </NavLink>
                </div>
                <div className="Navbar__Link toggleBorder">
                    <NavLink className='NavLink' activeClassName='currentNav' to='/newPost'>
                        New Post
                    </NavLink>
                </div>
            </nav>
            <nav className="Navbar__Items Navbar__Items--right">
                <div className="Navbar__Link" onClick={() => this.logout()}>
                <NavLink className='NavLink' to={`/`}>
                   Logout
                </NavLink>
                </div>
            </nav>
        </div> 
        )
    }
}