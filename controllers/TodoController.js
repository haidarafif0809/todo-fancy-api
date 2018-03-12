const Todo = require('../models/todo');
module.exports = {
  create: (req,res) => {
    let todo = new Todo({
      text: req.body.text,
      user: req.user._id,
      dueDate: req.body.dueDate
    });
    todo.save((err,data) => {
      if (err) {
        res.status(500).json({
          err
        });
      }
      res.status(200).json({
        message: "Success Create New Todo",
        data
      });
    });
  },
  index: (req,res) => {
    Todo.find({
      user: req.user._id
    })
    .populate('user')
    .exec().then((data) => {
      res.status(200).json({
        message: "Success Read Todos",
        data
      });
    }).catch((err) => {
      console.log(err);
    })
  },
  update: (req,res) => {
    Todo.findOne({_id: req.params.id},function(err,data) {
      if(err) return res.status(500).json({
        message: "Something Went Wrong",
        err
        });
      if(data.user == req.user._id) {
        Todo.findOneAndUpdate({_id:req.params.id},req.body,{ new: true},(err,data) => {
          res.status(200).json({
            message: "Success Update Todos",
            data
          });
        });
      } else {
          res.status(500).json({
            message: "Don't Have Permission"
          });
       }
    })

  },
  destroy: (req,res) => {
    Todo.findOne({_id: req.params.id},function(err,data) {
      if(err) return res.status(500).json({
        message: "Something Went Wrong",
        err
        });
      if(data.user == req.user._id) {
        Todo.findOneAndRemove({_id:req.params.id},(err,data) => {
          if (err) {
            res.status(500).json({
              message: 'Something Went Wrong',
              err
            });
          }
          res.status(200).json({
            message: "Success Delete Todos",
            data
          });
        });
      } else {
          res.status(500).json({
            message: "Don't Have Permission"
          });
      }
    })
  }

};
