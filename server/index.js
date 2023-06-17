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


app.get("/pagination", async (req, res) => {
    try {

        const { page } = req.query;
        const limit = 20;

        const offset = (page - 1) * limit;
        const queryResult = await pool.query("SELECT * FROM properties LIMIT $1 OFFSET $2", [limit, offset]);

        const properties = queryResult.rows;

        //deletes svg
        const filteredProperties = properties.map((property) => {
            return {
                ...property,
                photos: property.photos.filter((photo) => photo !== "https://www.sreality.cz/img/camera.svg")
            };
        });


        // console.log(queryResult.rows);
        // const properties = queryResult.rows;
        const { rows } = await pool.query("SELECT COUNT(*) as count FROM properties");

        const totalPages = Math.ceil(rows[0].count / limit);
        console.log(filteredProperties);

        res.json({
            data: filteredProperties,
            pagination: {
                page,
                limit,
                totalPages

            }
        });
    } catch (err) {
        console.log(err.message);
    }
});




app.listen(5000, () => {
    console.log("Server has stated (port 5000).");
});