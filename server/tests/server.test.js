const expect = require('expect');
const request = require('supertest');

var app = require('../server');
var Todo = require('../models/todo');
var todos = [{text:'first todo'},{text:'second todo'}];

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        Todo.insertMany(todos).then(()=>{
            done();
        });
    });
});

describe('POST /Todos', ()=>{

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
})