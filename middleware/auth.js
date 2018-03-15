const jwt = require('jsonwebtoken');

module.exports = {
  auth:(req,res,next) => {
    try {
      const decoded = jwt.verify(req.headers.token, 'secret');
      req.user = decoded
      next();
    } catch(err) {
      // err
      console.log(err);
      res.status(403).json({
        message: "Invalid Token"
      });
    }
  }

};
