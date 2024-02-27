const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatModel = new Schema(
    {
  users:[{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],

  lastMessage:{
     type: String,
     default: "say hi!"
    }
},
{
    timestamps:true
});

module.exports = mongoose.model('chatmodel',chatModel);