const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const app = require('../server');
const {Todo} = require('../models/todo');

const todos = [{
    _id:new ObjectID(),
    text:'first todo'
},{
    _id:new ObjectID(),
    text:'second todo'
}];

beforeEach((done) => {
    Todo.remove({})
    .then(() => {
        return Todo.insertMany(todos);
    })
    .then(() => done());
  });

 
  describe('GET /todos/:id',() => {
    it('Should return a specific todo', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('Should retutn 404 if todo not found',(done)=>{
        var newId = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${newId}`)
            .expect(404)
            .end(done);
    });

    it('Should return 404 if invalid ObjectID', (done)=>{
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done);
    });

}); 

describe('POST /todos', ()=>{

    it('Should create a new Todo', (done)=>{
        var text = 'Este es mi todo de prueba';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res)=>{
                expect(res.body.text).toBe(text);
            }).end((err,res)=>{
                if(err){
                    return done(err);
                }

                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err)=>{
                    done(err);
                })
            })
    });

    it('Should not create a todo with empty text', (done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res)=>{
                if(err){
                    return done(err);
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err)=>{
                    done(err);
                })
            });
            
    });

});



describe('GET /todos', ()=>{
    it('Should return all todos', (done)=>{
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res)=>{
                expect(res.body.toods.length).toBe(2);
            })
            .end(done());
    });
});
