const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

///middleware

app.use(cors());
app.use(express.json());


//Routes
//get all properties
app.get("/properties", async (req, res) => {
    try {
        const properties = await pool.query("SELECT * FROM properties");
        res.json(properties.rows);
    } catch (err) {
        console.log(err.message);
    }
});




app.listen(5000, () => {
    console.log("Server has stated (port 5000).");
});