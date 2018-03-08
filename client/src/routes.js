import React from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';

import Landing from './Components/Landing/Landing';
import Dashboard from './Components/Dashboard/Dashboard';
import Post from './Components/Post/Post';
import Fitness from './Components/Fitness/Fitness';
import MomToolsAndTips from './Components/MomToolsAndTips/MomToolsAndTips';
import Parenting from './Components/Parenting/Parenting';
import Recipes from './Components/Recipes/Recipes';
import Salutes from './Components/Salutes/Salutes';

export default (
    <Router>
        <div>
            <Route exact path='/' component={Landing} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/post' component={Post} />
            <Route path='/fitness' component={Fitness} />
            <Route path='/momToolsAndTips' component={MomToolsAndTips} />
            <Route path='/parenting' component={Parenting} />
            <Route path='/recipes' component={Recipes} />
            <Route path='/salutes' component={Salutes} />
        </div>
    </Router>
)