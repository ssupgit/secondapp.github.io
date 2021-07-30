//setup connection mongodb

const mongoose = require('mongoose');

const mongoDB = "mongodb+srv://FirstApp:Firstapp20213@firstapp.fo8pu.mongodb.net/MyFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(mongoDB,{useNewUrlParser:true}
).then(() => console.log('Mongodb Connected'));

mongoose.Promise = global.Promise;

module.exports = {mongoose}