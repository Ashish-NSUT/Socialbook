const express = require('express');
const User = require('../models/user');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();


// Search user by id and get its info
router.get("/:id", async (req, res) => {
    try{
        const user = await User.findById(req.params.id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        // to give Error instead of crashing
        console.log(error.message);
        res.status(500).send("Some Error Occured");
      }
})


// get user by name and get its info
router.get("/", fetchuser ,async (req, res) => {
    try{
        const keyword = req.query.search ? {
            name:{$regex: req.query.search, $options: "i"}
        }
        :{}
        
        const user = await User.find(keyword).select("-password").find({_id :{$ne:req.body.user}});
        res.status(200).json(user);

    } catch (error) {
        // to give Error instead of crashing
        console.log(error.message);
        res.status(500).send("Some Error Occured");
      }
})


router.put(
    "/addFriend/:id",
    fetchuser,
    async (req, res) => {
      try {
          await User.findByIdAndUpdate(req.body.user,{$push: {Friends:req.params.id}})
          
          res.json("New Friend added!");  
  
      } catch (error) {
          // to give Error instead of crashing
          console.log(error.message);
          res.status(500).send("Some Error Occured");
        }
    }
  );

module.exports = router;
