import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            recipe: {},
            fitness: {},
            momToolAndTip: {},
            parenting: {},
            salute: {}
        }
    }

    componentWillMount() {
        axios.get(`/api/posts/dashboard`)
        .then(res => {
            console.log(res.data);
            this.setState({ recipe: res.data[0], momToolAndTip: res.data[1], fitness: res.data[2], salute: res.data[3], parenting: res.data[4] });
        })
        .catch(err => {
            console.log(err);
        });
        
    }


  render() {
    return (
      <div className="Dashboard">

      <NavBar/>

      <div className="wrapper">
        <div className="item1">
            <Link className='postLink' to={`/post/${this.state.recipe.id}`}>
                <div className="Dashcard">
                    <img src={this.state.recipe.photo} alt="postpic"/>
                    <div className="container">
                        <h1>{this.state.recipe.title}</h1>
                    </div>
                </div>
            </Link>
        </div>
        <div className="item2">
            <Link className='postLink' to={`/post/${this.state.fitness.id}`}>
                <div className="Dashcard">
                <img src={this.state.fitness.photo} alt="postpic"/>
                    <div className="container">
                        <h1>{this.state.fitness.title}</h1>
                    </div>
                </div>
            </Link>
        </div>
        <div className="item3">
            <Link className='postLink' to={`/post/${this.state.momToolAndTip.id}`}>
                <div className="Dashcard">
                <img src={this.state.momToolAndTip.photo} alt="postpic"/>
                    <div className="container">
                        <h1>{this.state.momToolAndTip.title}</h1>
                    </div>
                </div>
            </Link>
        </div>
        <div className="item4">
            <Link className='postLink' to={`/post/${this.state.salute.id}`}>
                <div className="Dashcard">
                <img src={this.state.salute.photo} alt="postpic"/>
                    <div className="container">
                        <h1>{this.state.salute.title}</h1>
                    </div>
                </div>
            </Link>
        </div>
        <div className="item5">
            <Link className='postLink' to={`/post/${this.state.parenting.id}`}>
                <div className="Dashcard">
                <img src={this.state.parenting.photo} alt="postpic"/>
                    <div className="container">
                        <h1>{this.state.parenting.title}</h1>
                    </div>
                </div>
            </Link>
        </div>
      </div>
        
      </div>
    );
  }
}

