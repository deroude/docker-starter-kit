'use strict';

const express = require('express')
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000

app.use(cors());

let poems = JSON.parse(fs.readFileSync('poems.json'));

app.get('/random-poem', (req, res) => {
    let poem = poems[Math.floor(Math.random() * poems.length)];
    console.log(`Sent ${poem.title} by ${poem.author} to ${req.ip}`);
    res.json(poem);
}
);

app.listen(port, () => console.log(`Poetry app listening at http://localhost:${port}`))