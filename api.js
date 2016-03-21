/**
 * Server for delivering the frontend
 */

const express = require('express');
const helmet = require('helmet');
const nconf = require('nconf');

const app = express();

app.use(helmet());

nconf.env({
    match: /^WU_.+/
});

nconf.file('./public/config.json');

app.get('/config.json', (req, res, next) => {
    res.json(nconf.get());
});

app.use('/node_modules', express.static(__dirname + '/node_modules', {fallthrough: false}));

app.use(express.static(__dirname + '/public', {etag: false}));

app.use('*', express.static(__dirname + '/public', {etag: false}));

app.listen(process.env.PORT || 3000, () => {
    console.log(`App started at port ${process.env.PORT || 3000} `);
});
