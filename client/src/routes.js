import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
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

export default (
    

    <Router>
        <div>
            <Route exact path='/' component={Landing} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/post/:id' component={Post} />
            <Route path='/fitness' component={Fitness} />
            <Route path='/momToolsAndTips' component={MomToolsAndTips} />
            <Route path='/parenting' component={Parenting} />
            <Route path='/recipes' component={Recipes} />
            <Route path='/salutes' component={Salutes} />
            <Route path='/newPost' component={NewPost} />
            <Route path='/posts/edit/:id' component={EditPost} />

            
        </div>
    </Router>


)