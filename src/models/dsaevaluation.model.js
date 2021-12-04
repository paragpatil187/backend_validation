const mongoose=require('mongoose');

const dsaevaluationSchema= new mongoose.Schema({
    date_of_evaluation: {type:"String",required:true},
    instructor_details: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    student_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    student_marks:{type:"Number",required:true}
}, {
    versionKey:false,
    timestamps:true
})

module.exports=mongoose.model("dsaevaluation",dsaevaluationSchema);