//create require coding
const express = require('express');
const mongoose = require('mongoose');
const Food = require('./models/food');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
require ('dotenv').config();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URL);

app.use(cors());
app.use(express.json());

app.post('/insert', async (req, res) => {
    const foodName =req.body.foodName;
    const daysSinceIAte = req.body.daysSinceIAte;

    const food = new Food({
        foodName: foodName,
        daysSinceIAte: daysSinceIAte
    });

    try{
        await food.save();
        res.status(200).send("Food item saved successfully");
    }catch(err){
        res.status(500).send("Error inserting food item");
    }
});

app.get('/read', async (req, res) => {
    try{
        const foodItems = await Food.find({});
        res.status(200).json(foodItems);
    }catch(err){
        res.status(500).send("Error retrieving food items");    
    }
});

app.put('/update',async (req, res) => {
    const newFoodName= req.body.newFoodName;
    const id = req.body.id;
    try{
        await Food.findByIdAndUpdate(id, {foodName: newFoodName});
        res.status(200).send("Food item updated successfully");
    }catch(err){
        res.status(500).send("Error updating food item");
    }
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try{
        await Food.findByIdAndDelete(id);
        res.status(200).send("Food item deleted successfully");
    }catch(err){
        res.status(500).send("Error deleting food item");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
} );
