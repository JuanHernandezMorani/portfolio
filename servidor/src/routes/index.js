const { Router } = require('express');
const project = require('./project.js');
const mail = require('./mail.js');
const favIcon = require('./favicon.js');
const server = Router();

server.use('/projects', project);
server.use('/mails', mail);
server.use('/favicon.ico', favIcon);

module.exports = server;