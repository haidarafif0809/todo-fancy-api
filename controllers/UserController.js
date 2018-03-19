const User = require('../models/user');
const jwt = require('jsonwebtoken');
const FB = require('fb');

module.exports = {
  signin: (req,res) => {
    FB.api('me', { fields: ['id', 'name','email'], access_token: req.body.accessToken }, function (response) {
      User.findOne({
        email: response.email
      },(err, data) => {
        if (data) {
          const token = jwt.sign({ _id: data._id }, 'secret');
          res.status(200).json({
            message: "Success SignIn",
            data,
            token
          })
        } else {
          let user = new User({
            name: response.name,
            email: response.email,
            fbId: response.id
          });
          user.save((err,data) => {
            if (err) {
              res.status(500).json({
                message: "Something Went Wrong",
                err
              });
            }
            const token = jwt.sign({ _id: data._id }, 'secret');
            res.status(200).json({
              message: "Success SignIn",
              data,
              token
            });
          });
        }
      });
    });
  },
};
