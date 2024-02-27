const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  pic:{
    type: String,
    default: 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='
  },
  Likes: [{
    type: Schema.Types.ObjectId,
  }],
  Share: [{
    type: Schema.Types.ObjectId,
  }],
  Comments: [{
    body:{
        type: String,
    },
    person:{
        type: Schema.Types.ObjectId,
    }
  }],
},
{
    timestamps: true
});

const User = mongoose.model('user',UserSchema);
module.exports = User;