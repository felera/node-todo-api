const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var cors = require('cors')

const mongoose = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');



var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors());


app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text:req.body.text
    });
    
    todo.save().then((doc)=>{
        res.send(doc);
    }).catch((err)=>{
        res.status(400).send(`Unable to create Todo\n ${err}`);
    });
})

app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({
            message:'Here are your todos...',
            todos
        });
    }).catch((err)=>{
        res.status(400).send('Unable to fetch todos.\n', err);
    });
});

app.get('/todos/:id', (req, res)=>{
    var id = req.params.id;
    
    if (!ObjectID.isValid(id)){
       return res.status(404).send();
    }
    
    Todo.findById(id).then((todo)=>{
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((err)=>{
        res.status(404).send();
    });
});

app.delete('/todos/:id', (req, res)=>{
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send('Invalid id');
    }

    Todo.findByIdAndRemove(id)
        .then((todo)=>{
            if (!todo){
                return res.status(404).send('Todo not found');
            }
            return res.send({
                message:"Todo removed!",
                todo
            });
        }).catch(err=>{
            console.log(err);
            return res.status(404).send('Error while trying to remove todo...')
        });
});

app.listen(port,()=>{
    console.log(`Express server listening on port ${port}`);
})

module.exports = {app};