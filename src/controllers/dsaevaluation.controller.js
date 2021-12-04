const express=require('express');

const router = express.Router();

const Dsaevaluation=require('../models/dsaevaluation.model.js')

router.get("", async (req, res) => {
    try {
        const dsaevaluations= await Dsaevaluation.find().populate("student_id").populate("instructor_details").lean().exec();
        return res.send(dsaevaluations);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }

})

router.get("/highestMarks", async (req, res) => {
    try {
        const dsaevaluations= await Dsaevaluation.find().populate("student_id").populate("instructor_details").lean().exec();
        let arr=[];
        let max=0;
        for(let i=0;i<dsaevaluations.length;i++) {
            if(dsaevaluations[i].student_marks>max) {
                max=dsaevaluations[i].student_marks;
            }
        }
        for(let i=0;i<dsaevaluations.length;i++) {
            if(dsaevaluations[i].student_marks==max) {
                arr.push(dsaevaluations[i]);
            }
        }
        return res.send(arr);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }

})

router.post("", async (req, res) => {
    try {
        const dsaevaluation= await Dsaevaluation.create(req.body);
        return res.status(201).send(dsaevaluation);
    } catch (err) {
        return res.status(500).json({message: err.message,status:"Failed"});
    }
})

//no nneed of delete and patch
module.exports=router;