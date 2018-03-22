import React, { Component } from 'react';
import {HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import axios from 'axios';

import Landing from './Components/Landing/Landing';
import Dashboard from './Components/Dashboard/Dashboard';
import Post from './Components/Post/Post';
import Fitness from './Components/Fitness/Fitness';
import MomToolsAndTips from './Components/MomToolsAndTips/MomToolsAndTips';
import Parenting from './Components/Parenting/Parenting';
import Recipes from './Components/Recipes/Recipes';
import Salutes from './Components/Salutes/Salutes';
import NewPost from './Components/NewPost/NewPost';
import EditPost from './Components/EditPost/EditPost';

class CheckAuthentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            authenticated: false
        }
        this.checkAuthentication = this.checkAuthentication.bind(this);
    }

    componentDidMount() {
        this.checkAuthentication();
    }

    checkAuthentication() {
        axios.get('/api/me')
            .then(res => {
                console.log('Authenticated? ', res);
                if (!res.data) {
                    this.setState({ loading: false, authenticated: false });
                } else {
                    this.setState({ loading: false, authenticated: true });
                }
            })
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    Loading ...
                </div>
            )
        }
        //render ...loading if state.loading, props.children otherwise
        if (this.state.authenticated) {
            return (
                <div>
                    {this.props.children}
                </div>
            )
        } else {
            return (
                <Redirect to='/' />
            )
        }
    }
}

export default (
    

    <Router>
        <Switch>
            <Route exact path='/' component={Landing} />

            <Route render={() => {
                return (
                    <CheckAuthentication>
                        <Route path='/dashboard' component={Dashboard} />
                        <Route path='/post/:id' component={Post} />
                        <Route path='/fitness' component={Fitness} />
                        <Route path='/momToolsAndTips' component={MomToolsAndTips} />
                        <Route path='/parenting' component={Parenting} />
                        <Route path='/recipes' component={Recipes} />
                        <Route path='/salutes' component={Salutes} />
                        <Route path='/newPost' component={NewPost} />
                        <Route path='/posts/edit/:id' component={EditPost} />
                    </CheckAuthentication>
                )
                }
            }>

                

            </Route>
        </Switch>
    </Router>


)