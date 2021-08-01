
//setup connection mongodb

const mongoose = require('mongoose');
const dotenv = require ('dotenv');

dotenv.config();

mongoose.connect('process.env.DB_CONNECT',{useNewUrlParser:true},
    () => console.log('Mongodb Connected'));

mongoose.Promise = global.Promise;

module.exports = {mongoose}
