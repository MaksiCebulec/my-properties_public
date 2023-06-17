import React, { Fragment, useEffect, useState } from "react";
import './listProperties.styles.scss';
import Property from "../property/property.component";



const ListProperties = () => {

    const [properties, setProperties] = useState(null);
    const [totalPages, setTotalPages] = useState();

    const getProperties = async (page = 1) => {
        try {
            const response = await fetch(`http://localhost:5000/pagination?page=${page}`);
            console.log();
            const responseJSON = await response.json();
            setProperties(responseJSON.data);
            setTotalPages(responseJSON.pagination.totalPages)
            console.log(totalPages);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProperties();
    }, []);

    useEffect(() => {
        getProperties(undefined, currentLimit);
    }, [currentLimit]);


    function limitChange(e) {
        const newLimit = e.target.value;
        setCurrentLimit(newLimit);

        getProperties(undefined, newLimit);

    }


    return (
        <Fragment>
            <h1>My Properties</h1>

            <div className="limit-chooser">
                <label htmlFor="limit-select">Items per page:</label>
                <select id="limit-select" onChange={limitChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </div>


            <section className="properties">
                {properties === null ? (
                    <p>Loading...</p> // Display a loading message while fetching data
                ) : (
                    properties.map((property, index) => (
                        <Property key={index} property={property} />
                    ))
                )}
            </section>
            <footer>
                <Pagination getProperties={getProperties} totalPages={totalPages} />
            </footer>
        </Fragment>

    );
}


export default ListProperties;