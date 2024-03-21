const express = require('express');
const chatModel = require('../models/chatModel');
const fetchusers = require('../middleware/fetchuser');
const User = require('../models/user');
const router = express.Router();


// create new conversation
router.post("/",fetchusers, async (req, res) => {
    const newConversation = new chatModel({
        users:[req.body.senderId,req.body.receiverId],
    })
    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        // to give Error instead of crashing
        console.log(error.message);
        res.status(500).send("Some Error Occured");
      }
})


//get the conversation object
router.get("/getchats",fetchusers, async(req, res) => {
    try{
        let userId = req.body.user;
        if(userId.data) userId = userId.data;

        const conversation = await chatModel.find({
            users: {$in: [userId]},
        });

        res.status(200).json(conversation);

    } catch (error) {
        // to give Error instead of crashing
        console.log(error.message);
        res.status(500).send("Some Error Occured");
      }
})


router.get("/getFriends",fetchusers, async(req, res) => {
    try{
        let userId = req.body.user;
        if(userId.data) userId = userId.data;

        const user = await User.findById(userId);
        const Friends = await Promise.all(
            user.Friends.map(friend => {
                return User.findById(friend).select("-password");
            })
        );

        res.status(200).json(Friends);

    } catch (error) {
        // to give Error instead of crashing
        console.log(error.message);
        res.status(500).send("Some Error Occured");
      }
})

module.exports = router;

