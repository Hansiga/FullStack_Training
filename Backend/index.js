const express =require ('express');
const { default: mongoose } = require('mongoose');
const app = express();
const port = 3000;

require('dotenv').config();
require ('./db');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:{type:Number,required:true}
});

const User=mongoose.model('User',userSchema);

const newUser=new User({
    username:"Hansiga",
    email:"hansiga@gmail.com",
    age:20})
newUser.save().then(()=>{
    console.log("User saved successfully");
})
.catch((error)=>{
    console.error("Error saving user:",error);
});

app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`User ID: ${userId}`);
});


app.get('/users/:userId/profile',(req,res)=>{
    const userId=req.params.userId;
    const name=req.query.name;
    const age = req.query.age;
    res.send(`User ID: ${userId}, Name: ${name}, Age: ${age}`);
});


app.put('/users',(req,res)=>{
    res.send('PUT request to the users');
  });

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${port}`);
},);