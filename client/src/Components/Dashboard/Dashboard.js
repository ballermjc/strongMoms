import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="Dashboard">
        
        <div className="DashboardGrid">
            <NavBar />
            <div className="one">
                <h1>One</h1>
            </div>

            <div className="two">
                <h1>Two</h1>
            </div>

            <div className="three">
                <h1>Three</h1>
            </div>

            <div className="four">
                <h1>Four</h1>
            </div>

            <div className="five">
                <h1>Five</h1>
            </div>

        </div>
      </div>
    );
  }
}

