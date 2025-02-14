const express = require('express');
const { createUdhari, getUdhariByUser, updateUdhari, deleteUdhari, getUdhari } = require('../controller/udhar.controller.js');
const auth = require('../middleware/auth.middleware.js');
const udharRouter = express.Router();


udharRouter.post('/addudhari', auth, createUdhari);
udharRouter.get('/udhari/:userID', auth, getUdhariByUser);
udharRouter.get('/getUdhari', auth, getUdhari);
udharRouter.post('/udhari/:id', auth, updateUdhari);
udharRouter.delete('/udhari/:id', auth,deleteUdhari);

module.exports = udharRouter;
