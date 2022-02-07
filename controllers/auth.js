const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

//create user function
const createUser = async (req, res = response) => {

	try {
		const {email, password } = req.body;

		//use the model to save the user in database


		//verify that email does not exist
		const emailExist = await User.findOne({email});

		if(emailExist) {
			return res.status(400).json({
				ok: false,
				msg: 'Email already exists'
			});
		}

		const user = new User(req.body);
		//encrypt password

		const salt = bcrypt.genSaltSync(10);

		user.password = bcrypt.hashSync(password, salt);

		//save user in DB
		await user.save();

		//Generate JWT
		const token = await generateJWT(user.id);

		//return the user
		res.json({
			ok: true,
			user,
			token
		});

	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error, user could not be created',
			error	
		});
	}

	// res.json({
	// 	ok: true,
	// 	message: 'User Registered',
    //     body: req.body
	// });
};

//create login function
const login = async (req, res = response) => {

    const {email, password } = req.body;

	try {
		//Verify if email exists
		const user = await User.findOne({email});

		if(!user) {
			return res.status(400).json({
				ok: false,
				msg: 'Email was not found'
			});
		}

		//validate password
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Password is incorrect'
			});
		}

		//Generate JWT
		const token = await generateJWT(user.id);

		//return the user
		res.json({
			ok: true,
			user,
			token
		});

		
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Error, user could not be logged in',
			error	
		});
	}
		
};

//create renew token function
const renewToken = async (req, res = response) => {
	
	const uid = req.uid;

	//generate new JWT
	const token = await generateJWT(uid);

	//get user by uid
	const user = await User.findById(uid);

	res.json({
		ok: true,
		message: 'Token renewed',
		user,
		token
	});
};

module.exports = {
	createUser,
	login,
	renewToken,
};
