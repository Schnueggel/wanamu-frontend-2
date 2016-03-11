/**
 * Server for delivering the frontend
 */

const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.use('/node_modules', express.static(__dirname + '/node_modules', {fallthrough: false}));

app.use(express.static(__dirname + '/public', {etag: false}));

app.use('*', express.static(__dirname + '/public', {etag: false}));

app.listen(process.env.PORT || 3000, () => {
    console.log(`App started at port ${process.env.PORT || 3000} `);
});
