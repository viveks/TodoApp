const mongoose = require ('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// newTodo.save().then((doc)=>{
//   console.log(doc);
// }, (e)=>{
//   console.log(e);
// });


// newTodo.save().then((doc)=>{
//   console.log(doc);
// }, (e)=>{
//   console.log(e);
// });

var User = mongoose.model('User',{
  email: {
    type: String,
    trim: true,
    required: true,
    minlength: 1
  }
});

var newUser = new User({
  email: 'vinisinh@gmail.com '
});

newUser.save().then((doc)=>{
  console.log(doc)
},(e)=>{
  console.log(e);
});
