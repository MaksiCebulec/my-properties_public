const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

///middleware

app.use(cors()); //so you can use server and client on different ports
app.use(express.json());


//Routes
// get all properties
// app.get("/test", async (req, res) => {
//     try {
//         const queryResult = await pool.query("SELECT * FROM properties");
//         const properties = queryResult.rows;

//         // const filteredProperties = properties.map((property) => {
//         //     return {
//         //         ...property,
//         //         photos: property.photos.filter((photo) => photo !== "https://www.sreality.cz/img/camera.svg")
//         //     };
//         // });
//         res.json(properties);
//     } catch (err) {
//         console.log(err.message);
//     }
// });


app.get("/properties", async (req, res) => {
    try {

        const { page } = req.query;
        const limit = 20;

        const offset = (page - 1) * limit;
        const queryResult = await pool.query("SELECT * FROM properties LIMIT $1 OFFSET $2", [limit, offset]);
        const properties = queryResult.rows;

        //deletes svg
        const filteredProperties = properties.map((property) => { //filters, so is not the svg image of camera
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

        // if (page > totalPages) {
        //     // Redirect the user to the new last page
        //     res.redirect(`/properties?page=${totalPages}`);
        // } else {
        //     // Render the properties on the current page
        //     res.render('properties', { properties, totalPages });
        // }

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
        res.status(500).json({ message: 'Server error' });
    }
});




app.listen(5000, () => {
    console.log("Server has started (port 5000).");
});