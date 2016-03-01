var jwt = require('jwt-simple');
var secret = 'unicorn';

module.exports = {
  errorLogger: function (error, req, res, next) {
    // log the error then send it to the next middleware in
    console.error(error.stack);
    next(error);
  },
  errorHandler: function (error, req, res, next) {
    // send error message to client
    // message for gracefull error handling on app
    res.status(500).send({error: error});
  },
  encode: function (user){
    console.log('encode',user);

    var token = jwt.encode({id: user.userID}, secret);
    return token;
  },

  decode: function (req, res, next) {
    var token = req.headers['authorization'];
    var user;

    if (!token) {
      return res.send(403); // send forbidden if a token is not provided
    }

    try {
      // decode token and attach user to the request
      // for use inside our controllers
      user = jwt.decode(token, secret);
      if (user === undefined || user.id === undefined) {
        return res.status(401).json({error: 'invalid token', user: user});
      }
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }

  }
};


