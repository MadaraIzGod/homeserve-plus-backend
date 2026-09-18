const jwt = require('jsonwebtoken');

const AuthCheck = (req, res, next) => {
    try {
        const token = req.cookies.userToken; // read JWT from cookie

        if (!token) {
            return res.redirect('/login'); // not logged in
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
        req.user = decoded; // attach user data to req
        next(); // allow access
    } catch (error) {
        console.error(error);
        return res.redirect('/login'); // invalid token
    }
};

module.exports = AuthCheck;
