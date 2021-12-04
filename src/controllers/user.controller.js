
   
const express=require('express');//reqiure express for router rename app to router below line

const router = express.Router();

const User=require('../models/user.model.js')//for importing user schema .. for file in outdide of folder


//getting user........always use async await as returning thennable promise
router.get("", async (req, res) => {
    try {
        const users= await User.find().lean().exec();
        return res.send(users);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }

})
// getting particular user
router.get("/:id", async (req, res) => {
    try{
        const user=await User.findById(req.params.id).lean().exec();
        return res.send(user);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})
//post new user as per user schema correctly insert as json key value pair

router.post("", async (req, res) => {
    try {
        const users= await User.create(req.body);
        return res.status(201).send(users)
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})
// for delating by particular id
router.delete("/:id",async(req,res) => {
    try {
        const user= await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})
//for updating particular id
router.patch("/:id", async (req, res) => {
    try {
        const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true}).lean().exec();//new for intasnt updated data
        return res.status(201).send(user);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})

module.exports=router;///export router for app 
