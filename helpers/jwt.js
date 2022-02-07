const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {
	return new Promise((resolve, reject) => {
		const payload = { uid };

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{
				expiresIn: '1d',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('JWT could not be generated');
				} else {
					resolve(token);
				}
			}
		);
	});
};

//validate JWT and extract uid from token
const validateClientJWT = (token ='') => {

	try {
		const { uid } = jwt.verify(token, process.env.JWT_SECRET);

		return [ true, uid];
	} catch (error) {
		console.log('socket not valid');
		return [ false, null];
	}

};

module.exports = {
	generateJWT,
	validateClientJWT
};
