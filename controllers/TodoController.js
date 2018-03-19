const Todo = require('../models/todo');
module.exports = {
  create: (req,res) => {
    const { title, description, dueDate } = req.body;
    let todo = new Todo({
      title, description, dueDate,
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
    console.log(req.user._id);
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
        const  { title , description , dueDate } = req.body;
        let input = { title, description, dueDate };
        Todo.findOneAndUpdate({_id:req.params.id},input,{ new: true},(err,data) => {
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
  complete: (req,res) => {
    Todo.findOne({_id: req.params.id},function(err,data) {
      if(err) return res.status(500).json({
        message: "Something Went Wrong",
        err
        });
      const status = data.status + 1;
      if(data.user == req.user._id) {
        Todo.findOneAndUpdate({_id:req.params.id},{ status: status},{ new: true},(err,data) => {
          res.status(200).json({
            message: "Success Completed Todo",
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
  uncomplete: (req,res) => {
    Todo.findOne({_id: req.params.id},function(err,data) {
      if(err) return res.status(500).json({
        message: "Something Went Wrong",
        err
        });
      const status = data.status - 1;
      if(data.user == req.user._id) {
        Todo.findOneAndUpdate({_id:req.params.id},{ status: status},{ new: true},(err,data) => {
          res.status(200).json({
            message: "Success Completed Todo",
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
        console.log(data.user);
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
