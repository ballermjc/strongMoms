const express           = require('express'),
      Auth0Strategy     = require('passport-auth0'),
      app               = express(),
      bodyParser        = require('body-parser'),
      config            = require(`${__dirname}/config.js`),
      cors              = require('cors'),
      massive           = require('massive'),
      passport          = require('passport'),
      path              = require('path'),
      port              = 3001,
      session           = require('express-session');

const { domain, clientID, clientSecret } = config;

require('dotenv').config();

var corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors());
app.use(bodyParser.json());

//Connect to DB
massive(process.env.CONNECTION_STRING).then(dbInstance => {
    console.log('connected to the db');
    app.set('db', dbInstance)
}).catch(err => {
    console.log('DB Connection ERROR: ', err);
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
    domain: domain,
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: '/api/auth/setUser',
    scope: 'openid profile'
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        console.log('Profile: ', profile, 'Ending');
        done(null, profile);
}));

passport.serializeUser((user, done) => {
    console.log('User: ', user, 'end');
    done(null,
    {
        id: user.user_id,
        firstName: user.first || '',
        lastName: user.last || ''
    });
    console.log('User_ID:', user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

//Authorization Endpoints

app.get('/api/auth/login',
    passport.authenticate('auth0', {
        successRedirect: '/api/auth/setUser',
        failureRedirect: '/',
        failureFlash: true
}));

app.get('/api/auth/setUser', passport.authenticate('auth0'), (req, res, done, ) => {
    let passportUser = req.session.passport.user;
    console.log('req.sessionID: ', req.sessionID);
    console.log('Passport User: ', passportUser);
    const dbInstance = app.get('db');
    dbInstance.read_user([ passportUser.id ])
        .then(user => {
            console.log('Promise: ', user);
            if(user.length && user[0].userid) {
                console.log('DB User already exists: ', user);
                return done(null, profile);
            } else {
                dbInstance.create_user( [ passportUser.id ])
                    .then(user => {
                        console.log('Created new User in DB: ', user);
                        return done(null, profile);
                    })
            }
        })
    res.redirect('/#/dashboard');
});

app.get('/api/auth/logout', (req, res) => {
    req.logOut();
    console.log('User is logged out', req.session.passport);
    res.redirect('/');
})


//Post Routes
app.get('/api/posts', (req, res) => {
    const dbInstance = app.get('db');
    dbInstance.read_posts()
        .then(posts => {
            res.status(200).send(posts);
        });
});

app.get('/api/posts/mostRecent', (req, res) => {
    const dbInstance = app.get('db');
    dbInstance.read_three_posts()
        .then(posts => {
            res.status(200).send(posts);
        });
});

app.get('/api/posts/dashboard', (req, res) => {
    const dbInstance = app.get('db');
    dbInstance.read_dashboard_posts()
        .then(posts => {
            res.status(200).send(posts);
        });
});

app.get('/api/posts/:category', (req, res) => {
    const dbInstance = app.get('db');
    console.log(req.params.category);
    dbInstance.read_postsByCategory( [req.params.category] )
        .then(posts => {
            let recentPosts = posts.slice(0,3);
            res.status(200).send(recentPosts);
        });
});

app.get('/api/posts/recent', (req, res) => {
    const dbInstance = app.get('db');
    dbInstance.read_three_posts()
        .then(posts => {
            res.status(200).send(posts);
        });
});

app.get('/api/post/:id', (req, res) => {
     const dbInstance = app.get('db');
     dbInstance.read_post( [req.params.id] )
        .then(post => {
            res.status(200).send(post);
            console.log(post);
        });
});

app.post('/api/posts', (req, res) => {
    const dbInstance = app.get('db');
    const UserID = req.session.passport.user.id;
    const { title, body, category, photo } = req.body;
    dbInstance.create_post( [ title, body, category, photo, UserID ] )
        .then(post => {
            res.status(200).send(post);
            console.log(post);
        });
});

app.patch('/api/post/:id', (req, res) => {
    const dbInstance = req.app.get('db');
    const postID = req.params.id;
    const { title, body, category, photo } = req.body;
    dbInstance.update_post([ postID, title, body, category, photo ])
        .then(post => {
            res.status(200).send(post);
        });
});

app.delete('/api/post/:id', (req, res) => {
    const dbInstance = req.app.get('db');
    const postID = req.params.id;
    dbInstance.delete_post([ postID ])
        .then(() => {
            console.log("Post Deleted");
        });
});


//for hosting
app.use( express.static( `${__dirname}/../client/build` ) );
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

//Run Server

app.listen(port, console.log(`Oh Snap, the party is on port ${port}`));




// CREATE TABLE Users (
//     ID SERIAL PRIMARY KEY,
//     UserID Text Unique,
//     FirstName Text,
//     LastName Text,
//     isAdmin BOOLEAN,
//     isSuperUser BOOLEAN


// CREATE TABLE Posts (
//     ID Serial Primary Key,
//     PostID text,
//     Title text,
//     Body text,
//     Category text,
//     UserID text references Users(UserID)
// )