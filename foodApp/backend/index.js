//create require coding
const express = require('express');
const mongoose = require('mongoose');
const Food = require('./models/food');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb+srv://hansigap23it_db_user:fullstack@cluster0.ky7arh7.mongodb.net/');