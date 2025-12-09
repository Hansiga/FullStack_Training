const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3002;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://hansigap23it_db_user:fullstack@cluster0.ky7arh7.mongodb.net/')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// Food Schema
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  daySinceIAte: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Food = mongoose.model('Food', foodSchema);

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  token = token.replace('Bearer ', '');

  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });

  await user.save();
  res.status(201).send('User registered');
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Create Food (NOTE: corrected route → /api/food)
app.post('/api/food', verifyToken, async (req, res) => {
  try {
    const { name, daySinceIAte } = req.body;

    const food = new Food({
      name,
      daySinceIAte,
      user: req.userId
    });

    await food.save();
    res.status(201).send('Food entry created');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get Foods
app.get('/api/food', verifyToken, async (req, res) => {
  try {
    const foods = await Food.find({ user: req.userId });
    res.json(foods);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update Food
app.put('/api/food/:id', verifyToken, async (req, res) => {
  try {
    const { name, daySinceIAte } = req.body;

    const result = await Food.updateOne(
      { _id: req.params.id, user: req.userId },
      { name, daySinceIAte }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send("No matching item found for update");
    }

    res.send("Food entry updated successfully");
  } catch (error) {
    res.status(500).send("Server error");
  }
});



// Delete Food
app.delete('/api/food/:id', verifyToken, async (req, res) => {
  try {
    await Food.deleteOne({ _id: req.params.id, user: req.userId });
    res.send('Food entry deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
