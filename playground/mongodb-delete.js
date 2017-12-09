//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        console.log('Unable to connect to mongo db', err);
        return;
    }

    //shut down the mongodb service after you see this message
    console.log('Connected to Mongo DB Server');

    db.collection('Users').deleteMany({name:'francisco'})
        .then(function log(result){
            console.log(result);
        });

    db.collection('Users').findOneAndDelete({_id:new ObjectID('5a25d52d32d114364cd2441a')})
    .then(function log(result){
        console.log(result);
        db.close();
    })
    

});