const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		//The connection string is saved in our environments file
		await mongoose.connect(process.env.DB_CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('Database connected');
	} catch (error) {
		console.log(error);
		throw new Error('Error connecting to database please check logs');
	}
};

//export the connection
module.exports = {
	dbConnection,
};
