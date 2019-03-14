const express = require('express');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const morgan = require('morgan');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');

const {Pool} = require('pg');
const pgClient = new Pool(keys.pgConnection);
pgClient.on('error', () => console.log('Lost PG connection'));

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('facerecognition api')
});
app.post('/signin', signin.signinAuthentication(pgClient, bcrypt));
app.post('/register', (req, res) => {
    register.handleRegister(req, res, pgClient, bcrypt)
});
app.get('/profile/:id', auth.requireAuth, (req, res) => {
    profile.handleProfileGet(req, res, pgClient)
});
app.post('/profile/:id', auth.requireAuth, (req, res) => {
    profile.handleProfileUpdate(req, res, pgClient)
});
app.put('/image', auth.requireAuth, (req, res) => {
    image.handleImage(req, res, pgClient)
});
app.post('/imageurl', auth.requireAuth, (req, res) => {
    image.handleApiCall(req, res)
});

const port = keys.nodePort;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
