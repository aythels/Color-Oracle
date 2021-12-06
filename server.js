const { getProfileImage } = require('./scraper.js');

const cors = require('cors');

const express = require('express')
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

app.use(cors({origin: 'http://localhost:5000'}));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

//---------------------------------------------------------------API

app.get('/api/profile/:id', (req, res) => {
    const username = req.params.id;

    if (username.length < 2 || username.length > 30) res.status(400).send('Bad request');

    console.log("sending request");

    getProfileImage(username)
    .then((data) => {
        try {
            const obj = JSON.parse(data);
            if (obj.profile_pic_url)  res.send({username: username, url: obj.profile_pic_url});      
            else res.status(400).send("Invalid username?"); 
        } catch (error) {
            console.log(error, data);
            res.status(400).send(error);
        }

    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
    
});

//---------------------------------------------------------------ROUTES

app.use(express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
    res.sendFile('/public/index.html', { root: __dirname });
});

app.get('*', (req, res) => {
    res.redirect('/');
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Bad request?')
  })

//---------------------------------------------------------------STARTING SERVER

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`));


