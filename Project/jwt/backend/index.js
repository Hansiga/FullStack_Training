require("dotenv").config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');

// -------------------- MONGODB CONNECTION -------------------- //
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("DB Error:", err));

// -------------------- USER SCHEMA --------------------------- //
const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

const User = mongoose.model('User', UserSchema);

// -------------------- STUDENT SCHEMA --------------------------- //
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNumber: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: Number, required: true },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Student = mongoose.model('Student', studentSchema);

// -------------------- EXPRESS SETUP -------------------------- //
const app = express();
app.use(cors());
app.use(express.json());

// -------------------- REGISTER ------------------------------- //
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });
        await user.save();

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.log(err);
        // if duplicate key
        if (err.code === 11000) return res.status(400).send("Username already exists");
        res.status(500).send("Server error");
    }
});

// -------------------- LOGIN ---------------------------------- //
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).send("Invalid credentials");

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).send("Invalid credentials");

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

// -------------------- JWT VERIFY MIDDLEWARE ------------------- //
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).send("No token provided");

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send("Invalid token");
        req.userId = decoded.userId;
        next();
    });
};

// -------------------- ADD STUDENT -------------------------------- //
app.post('/api/students', verifyToken, async (req, res) => {
    try {
        const { name, rollNumber, department, year } = req.body;

        const student = new Student({
            name,
            rollNumber,
            department,
            year,
            user: req.userId
        });

        await student.save();

        res.status(201).json(student);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

// -------------------- GET STUDENTS -------------------------------- //
app.get('/api/students', verifyToken, async (req, res) => {
    try {
        const students = await Student.find({ user: req.userId }).sort({ name: 1 });
        res.json(students);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

// -------------------- DELETE STUDENT ------------------------------ //
app.delete('/api/students/:id', verifyToken, async (req, res) => {
    try {
        const deleted = await Student.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!deleted) return res.status(404).send("Student not found");

        res.send("Student deleted");
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

// -------------------- UPDATE STUDENT ------------------------------ //
app.put('/api/students/:id', verifyToken, async (req, res) => {
    try {
        const { name, rollNumber, department, year } = req.body;

        const updated = await Student.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { name, rollNumber, department, year },
            { new: true }
        );

        if (!updated) return res.status(404).send("Student not found");

        res.json(updated);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

// -------------------- SERVER START ----------------------------- //
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
