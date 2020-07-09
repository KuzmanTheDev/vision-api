/**SETUP... */
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

/** DATABASE STUFF.. */
const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'emma20',
        database : 'matrix'
    }
});
    
const app = express();

app.use(bodyParser.json());
app.use(cors())

/** ENDPOINTS/ROUTES... */

app.get('/', (req,res)=>{res.send('it is working')})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res)=>{register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) =>{image.handleImage(req, res, db)})

app.listen(process.env.PORT || 3000, () =>{
    console.log('app is running smooooth..');
})


/** When sending data from the front-end using 'json' we need to parse it! */


/*
    End Points....
 / --> res = this is working
 /signin --> POST = success/fail
 /register --> POST = newUser
 /profile/:userId--> GET = user
 /image --> PUT = user
 */      