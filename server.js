const express = require('express');
const cors = require("cors"); 
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.json ({ message: 'Capstone backend is running successfully!' });
});

app.get("/api/ping", (req, res) => {
    res.json({ message: "pong" });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
