var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require ('./db/db');
var {Todo} = require ('./models/Todo');
var {ObjectID} = require('mongodb');

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=> {
  var todo = new Todo({
    text: req.body.text
  }) ;

  todo.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos',(req, res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(err)=>{
    res.status(400).send(e);
  })
});

app.get('/todos/:id',(req,res)=>{

  if(!ObjectID.isValid(req.params.id)){
    return res.status(404).send();
  }

  Todo.findById(req.params.id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.status(200).send({todo});
  },(e)=>{
    res.status(400).send();
  });
});

app.listen(3000,() => {
  console.log('started on port 3000');
});

module.exports = {app};
