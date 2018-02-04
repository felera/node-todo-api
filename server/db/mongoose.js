const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// la URL se setea desde config.js
// var mongoDbUrl = "";
// if(process.env.PORT) 
//     mongoDbUrl = 'mongodb://nodetodouser:w2know98@ds141657.mlab.com:41657/heroku_todo_db'
// else
//     mongoDbUrl = 'mongodb://localhost:27017/TodoApp';

mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};