const {mongoose} = require('./../server/db/db');
const {Todo} = require('./../server/models/Todo');
const {ObjectID} = require('mongodb');

var id = '5916608872cafe0b2e8217b6';
if(!ObjectID.isValid(id))   {
  console.log('Object ID not valid')
}

Todo.find({
  _id: id
}).then((todos) => {
  console.log(todos);
});

Todo.findOne({
  _id: id
}).then((todos) => {
  console.log(todos);
});

Todo.findById(id).then((todo)=>{
  if(!todo){
    console.log('No todo found')
  };
  console.log(JSON.stringify(todo,undefined,2));
},(e)=>{
  console.log(e);
});
