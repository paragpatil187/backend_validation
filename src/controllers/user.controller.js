const express= require("express");

const{body,validationResult} =require("express-validator");

const User= require("../models/user.model.js");

const router=express.Router();

router.get("/",async(req,res)=>{
    try{
        const users=await User.find().lean().exec();


    }
    catch(e){
        return res.status(500).json({status:"failed", message:e.message});


    }
});


router.post("/",
body("first_name").notEmpty().withMessage("first name is required"),
body("last_name").notEmpty().withMessage("last name is required"),
body("pincode").isNumeric().isLength({min:6,max:6}).withMessage("Pincode has to be 6 digits"),
body("email").isEmail().withMessage("please provide correct email"),
body("age").custom((value) => {
    const isNumber = /^[0-9]*$/.test(value);///regular  expression with test as in build
    if(!isNumber ||  value >= 100 || value<=0) {
        throw new Error("age between 1 to 100");
    }
    return true;
    
}),
body("gender").notEmpty().custom(async(value)=>{
    let arr=["male","female","others"];
    let count=0;
    //console.log(value)
    for(let i=0;i<3;i++){
       // console.log(arr[i])
         if(value==arr[i]){
            count++
         }
            
         }
       // console.log(count)
        if(count==0){
            throw new Error("enter valid gender like male female or other")

        }

}),
 async(req,res)=>{
     
    const errors= validationResult(req);
    if(!errors.isEmpty()) {
        let newErrors = errors.array().map(({msg,param,location})=>{
            return{
                [param]:msg,
            };
        });
        return res.status(400).json ({errors:newErrors});
    }
    

    
    
    try{
        const users=await User.create(req.body);
        return res.status(201).json({users})




    }
    catch(e){
        return res.status(500).json({status:"failed", message:e.message});


    }
});
module.exports=router;