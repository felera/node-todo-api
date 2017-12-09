//import { setTimeout } from 'timers';

//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        console.log('Unable to connect to mongo db', err);
        return;
    }

    console.log('Connected to Mongo DB Server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id:new ObjectID('5a25d3a48f157935b957b03d')
    // },{
    //     $set:{
    //         completed:true
    //     }
    // },{
    //     returnOriginal:false
    // }).then((result)=>{
    //     console.log(result);
    // });
    db.collection('Users').findOneAndUpdate({
        _id:new ObjectID('5a2b6c9534641f655ab11beb')
    },{
        $set:{
            country:'Perú'
        }, 
        $inc :{
            age:3   
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result);
        
    }).catch((err)=>{
        console.log('Unable to Update your age!!!\n', err);
    });
    db.close();

});

