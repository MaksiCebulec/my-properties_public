import React, { Fragment, useEffect, useState } from "react";
import './listProperties.styles.scss';
import Property from "../property/property.component";



const ListProperties = () => {

    const [properties, setProperties] = useState(null);


    const getProperties = async () => {
        try {
            const response = await fetch('http://localhost:5000/properties');
            const responseJSON = await response.json();
            setProperties(responseJSON);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProperties();
    }, []);



    return (
        <Fragment>
            <h1>My Properties</h1>

            <section className="properties">
                {properties === null ? (
                    <p>Loading...</p> // Display a loading message while fetching data
                ) : (
                    properties.map((property, index) => (
                        <Property key={index} property={property} />
                    ))
                )}
            </section>
        </Fragment>

    );
}


export default ListProperties;