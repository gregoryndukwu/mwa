const mongoose= require("mongoose");

const studentSchema= mongoose.Schema({
    name:String,
    GPA: Number
})

mongoose.model("Students",studentSchema, process.env.SCHOOL_MODEL);