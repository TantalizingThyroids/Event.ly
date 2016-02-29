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
    res.send(500, {error: error.message});
  },
  encode: function (user){
    var token = jwt.encode({id: user.id}, secret);
    return token;
  },

  decode: function (req, res, next) {
    console.log(req.headers);
    var token = req.headers['authorization'];
    var user;

    if (!token) {
      return res.send(403); // send forbidden if a token is not provided
    }

    try {
      // decode token and attach user to the request
      // for use inside our controllers
      user = jwt.decode(token, secret);
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }

  }
};


