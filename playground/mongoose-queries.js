const {ObjectID} = require('mongodb')
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// var id = '5a3d0e5090d57a0d84abf434x';

// if (!ObjectID.isValid(id)){
//     console.log('Object Id not valid!');
// } 

// Todo.findById(id).then((todo)=>{
//     console.log(todo);
// }).catch((err)=>{
//     console.log('danger!');
// });

var id = '5a3d0e5090d57a0d84abf434';

User.findById(id).then((user)=>{
    if (!user){
        return console.log('User not found!!!');
    }
    console.log(user);
}).catch((err)=>{
    console.log(err);
})