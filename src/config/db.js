const mongoose = require('mongoose');
 
function connectToDatabase () {
mongoose.connect('mongodb://127.0.0.1:27017/chatbot')
.then(() => console.log('Connected!')).catch(err => console.log(err));
}
module.exports = connectToDatabase;