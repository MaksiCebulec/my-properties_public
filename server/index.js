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
        const queryResult = await pool.query("SELECT * FROM properties");
        const properties = queryResult.rows;

        const filteredProperties = properties.map((property) => {
            return {
                ...property,
                photos: property.photos.filter((photo) => photo !== "https://www.sreality.cz/img/camera.svg")
            };
        });
        res.json(filteredProperties);
    } catch (err) {
        console.log(err.message);
    }
});




app.listen(5000, () => {
    console.log("Server has stated (port 5000).");
});