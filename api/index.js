'use strict';

const express = require('express')
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000

app.use(cors());

let poems = JSON.parse(fs.readFileSync('poems.json'));

app.get('/random-poem', (req, res) => res.send(poems[Math.floor(Math.random() * poems.length)]));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))