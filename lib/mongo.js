var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/userdb', {useMongoClient: true});

var userSchema = new mongoose.Schema({
    email: String,
    password: String
})

var model = mongoose.model('user', userSchema);

module.exports = model; 