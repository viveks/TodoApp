const expect = require('expect');
const request = require('supertest');
var {app} = require('../server');
var {Todo} = require ('../models/Todo');

const testTodos = [{
  text: 'test todo 1'
},
{
  text: 'test todo 2'
}]
beforeEach((done) => {
  Todo.remove({}).then(()=>{
    return Todo.insertMany(testTodos);
  }).then(()=>done());
});
describe('POST /todos',()=>{
  it('should create a new todo', (done)=>{
    var text = 'new test for todo';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }

        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=>done(e));
    });
  });

  it('should not create todo with invalid data',(done) => {
    var text={};
    request(app)
      .post('/todos')
      .send(text)
      .expect(400)
      .end((err,res)=>{
        if (err){
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(testTodos.length);
          done();
        }).catch((e)=>done(e));
      });
  });
});


describe('GET /todos', () => {
  it('should return todos from db', (done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      }).end(done);
  });
});
