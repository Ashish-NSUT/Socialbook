const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();  


const connectToMongo = ()=>{
    mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to DB!'))
    .catch(error => console.log(error)) 
}
 
module.exports = connectToMongo;