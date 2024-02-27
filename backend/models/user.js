const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const {Schema} = mongoose;

const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  pic:{
    type: String,
    default: 'https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0='
  },
  Friends: [{
    type: Schema.Types.ObjectId,
  }]
},
{
    timestamps: true
});


UserSchema.post("save", async (doc) => {
  try{

    console.log(doc);

    let transportor = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    let sendMail = await transportor.sendMail({
      from: "Student-Book",
      to: doc.email,
      subject: "Welcome to Student Book",
      html: "<h2>Welcome to Student Book</h2> <p> Your Id has been succesfully created on the Student Book</p>"
    })

    console.log(sendMail);

  }catch(err){
    console.log(err);
  }
})

const User = mongoose.model('user',UserSchema);
module.exports = User;