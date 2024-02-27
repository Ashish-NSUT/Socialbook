const express = require('express');
const Message = require('../models/Message');
const fetchusers = require('../middleware/fetchuser');
const router = express.Router();


// create new message
router.post("/",fetchusers, async (req, res) => {
    const newMessage = new Message(req.body);

    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        // to give Error instead of crashing
        console.log(error.message);
        res.status(500).send("Some Error Occured");
      }
})


//get the conversation object
router.get("/:chatId",fetchusers, async(req, res) => {
    try{
        const allMessages = await Message.find({chatModel:req.params.chatId});

        res.status(200).json(allMessages);

    } catch (error) {
        // to give Error instead of crashing
        console.log(error.message);
        res.status(500).send("Some Error Occured");
      }
})

// delete a message
router.delete(
    "/deleteMessage/:id",
    fetchusers,
    async (req, res) => {
      try {
  
          // find by id and delete note
          let message = await Message.findById(req.params.id);
          if(!message) {return res.status(404).send("Not Found")};
        
          // check if the user is authenticated
          if(message.sender.toString() !== req.body.user) {
              return res.status(401).send("Access Denied");
          }
  
          message = await Message.findByIdAndDelete(req.params.id);
          
          res.json({success: "Deleted", message: message});
  
      } catch (error) {
          // to give Error instead of crashing
          console.log(error.message);
          res.status(500).send("Some Error Occured");
        }
    }
  );

module.exports = router;

