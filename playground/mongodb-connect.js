//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var _id = new ObjectID();
console.log(_id);


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        console.log('Unable to connect to mongo db', err);
        return;
    }

    console.log('Connected to Mongo DB Server');

    // db.collection('Todos').insertOne({
    //     text:'some task...',
    //     completed:false
    // },(err, result)=>{
    //     if(err){
    //         console.log('Unable to insert new todo');
    //         return;
    //     }

    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
    //     name:'francisco',
    //     age:31,
    //     locaion:'Perú'
    // },(err, result)=>{
    //     if(err){
    //         console.log('Unable to insert new User', err);
    //         return;
    //     }

    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });


    db.close();
});