//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        console.log('Unable to connect to mongo db', err);
        return;
    }

    //shut down thhe mongodb service after you see this message
    console.log('Connected to Mongo DB Server');

    // setTimeout(()=>{ 
        // db.collection('Todos').find({_id:new ObjectID('5a27f4b014a352ca1a8c80c4')}).toArray()
        // .then((docs)=>{
        //     console.log(JSON.stringify(docs,undefined,2));
        // })
        // .catch((err)=>{
        //     console.log('Error while fetching "Todos" collection \n',err);
        // });
    // },3000);
    //db.close();

    // db.collection('Users').find().count()
    // .then((result)=>{
    //     console.log(`There are ${result} documents`);
    // })
    // .catch((err)=>{
    //     console.log('Error while fetching "Todos" collection \n',err);
    // });

    db.collection('Users').find({name:'francisco'}).toArray()
    .then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    })
    .catch();
});