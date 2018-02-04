const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var mongoDbUrl = "";
if(process.env.PORT) 
mongoDbUrl = 'mongodb://nodetodouser:w2know98@ds141657.mlab.com:41657/heroku_todo_db'
else
mongoDbUrl = 'mongodb://localhost:27017/TodoApp';

mongoose.connect(mongoDbUrl);

module.exports = mongoose;