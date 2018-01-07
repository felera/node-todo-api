const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://nodetodouser:w2know98@ds141657.mlab.com:41657/heroku_todo_db || mongodb://localhost:27017/TodoApp');

module.exports = mongoose;