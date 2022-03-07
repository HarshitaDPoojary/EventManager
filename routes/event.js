const express = require('express');

const router = express.Router();

const eventController = require('../controllers/event.controller');


router.post('/create', eventController.create);
router.get('/getList', eventController.getList);

module.exports = router;
