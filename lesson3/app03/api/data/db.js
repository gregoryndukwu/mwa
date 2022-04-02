const mongoose= require("mongoose");

mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to",process.env.DB_NAME);
})

mongoose.connection.on("disconnected", function(err){
    console.log("Mongoose Disconnected",err)
})

process.on("SIGINT",function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGNT_MESSAGE);
        process.exit(0);
    })
   
})