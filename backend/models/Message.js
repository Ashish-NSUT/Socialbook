const mongoose = require('mongoose');
const {Schema} = mongoose;

const Message = new Schema({
  sender:{
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  message:{
    type: String,
    required: true
  },
  chatModel:{
    type: Schema.Types.ObjectId,
    ref: 'chatModel'
  }
  
},
{
    timestamps: true
});

module.exports = mongoose.model('message',Message);