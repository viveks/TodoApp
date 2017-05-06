const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db) => {
  if (err){
    return console.log('Unable to connect to database');
  }

  db.collection('Users').find({name: 'Vivek'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs,undefined,2));
  }, (err) => {
    console.log(err);
  });

});
