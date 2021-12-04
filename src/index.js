
const express= require('express');




const userController = require("./controllers/user.controller");
const studentController = require("./controllers/student.controller");
const codingevaluationController = require("./controllers/codingevaluation.controller");
const dsaevaluationController = require("./controllers/dsaevaluation.controller");



const app=express();
app.use(express.json());


app.use("/users",userController);//put all request using /users it will work
app.use("/students",studentController);
app.use("/codingevaluations",codingevaluationController);
app.use("/dsaevaluations",dsaevaluationController);

module.exports=app;