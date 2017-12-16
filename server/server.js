const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
const User = require('./models/user');
const Todo = require('./models/todo');

var app = express();
app.use(bodyParser.json());

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

app.listen(3000,()=>{
    console.log('Express server listening on port 3000');
})

module.exports = app;