const mongoose = require('mongoose');
const uri="mongodb+srv://hansigap23it_db_user:fullstack@cluster0.ky7arh7.mongodb.net/"
mongoose.connect(uri)
const connection=mongoose.connection
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
});


