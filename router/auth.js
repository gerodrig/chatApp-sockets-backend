/*
Path api/login
*/
const {Router } = require('express');
const { check } = require('express-validator');
const { createUser, renewToken, login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();


//define endpoints

//Create new users
/* NAME STRING
    password: string not empty
    email is email
*/
router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],
createUser );


//Login make sure that user and password is correct
router.post('/',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],login);

//Revalidate token
router.get('/renew', validateJWT, renewToken);

module.exports = router;