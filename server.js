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
            res.send({username: username, url: obj.profile_pic_url});            
        } catch (e) {
            console.log(e, data);
            res.status(400).send('Bad request');
        }

    }).catch((error) => {
        console.log(error);
        res.status(400).send('Bad request');
    });

    /*
    getProfileImage(username)
        .then(data => {
            res.send({username: username, url: data});
            console.log(data, "this is some text");
        })
        .catch(error => {
            console.log(error);
            res.status(400).send('Bad request');
        });*/

    
});

app.get('/api/images/:id', (req, res) => {
    const username = req.params.id;

    /*
    if (username.length < 2 || username.length > 30) res.status(400).send('Bad request');

    getImages(username)
        .then(data => {
            console.log(username);
            res.send(data);
        })
        .catch(error => {
            console.log(error);
            res.status(400).send('Bad request');
        });*/
    res.status(400).send('Bad request');
});

app.post('/api', (req, res) => {
    console.log(req.body);

    /*

    const tolArray = req.body.tolArray;
    const colorArray = req.body.colorArray;

    const regexTol = new RegExp(/^([0-9]|10)$/);

    const regex = new RegExp(/^([0-9]|[1-9][0-9]|[1-3][0-5][0-9]|360)$/);
    const regex2 = new RegExp(/^([0-9]|[1-9][0-9]|100)$/);

    if (!regexTol.test(tolArray[0])) res.status(400).send('Bad request');
    if (!regexTol.test(tolArray[1])) res.status(400).send('Bad request');
    if (!regexTol.test(tolArray[2])) res.status(400).send('Bad request');
    if (!regex.test(colorArray[0])) res.status(400).send('Bad request');
    if (!regex2.test(colorArray[1])) res.status(400).send('Bad request');
    if (!regex2.test(colorArray[2])) res.status(400).send('Bad request');

    console.log("getting colors");
	res.send($filter(tolArray, colorArray));*/

    res.status(400).send('Bad request');
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


