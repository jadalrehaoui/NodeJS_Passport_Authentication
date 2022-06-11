const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
// const middlewares = require('../middlewares');

// router.get('/', middlewares.isAuthenticated, controller.inspect);
// router.post('/register', controller.register)
// router.post('/login', controller.login);
// router.put('/', controller.modify);

router.get('/', controller.get)

module.exports = router;
