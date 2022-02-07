const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {

    //Get token from header
    const token = req.header('x-token');

    //Check if token exists
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token is not provided',
        });
    }

    //Verify token
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token is not valid',
        });
    }
}

module.exports = {
    validateJWT
}