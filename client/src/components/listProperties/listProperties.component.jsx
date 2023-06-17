import React, { Fragment, useEffect, useState } from "react";
import './listProperties.styles.scss';
import Property from "../property/property.component";
import Pagination from "../pagination/pagination.component";
import Loading from "../loading/loading.component";


const ListProperties = () => {

    const [properties, setProperties] = useState(null);
    const [totalPages, setTotalPages] = useState();
    const [loading, setLoading] = useState(false);

    const getProperties = async (page = 1) => {
        try {

            setLoading(true);
            console.log("Getproperties");
            const response = await fetch(`http://localhost:5000/pagination?page=${page}`);
            console.log();
            const responseJSON = await response.json();
            setProperties(responseJSON.data);
            setTotalPages(responseJSON.pagination.totalPages)
            console.log(totalPages);

            setTimeout(() => {
                setLoading(false);
            }, 250);

        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getProperties();
        console.log("Use effect");
    }, []);// eslint-disable-line react-hooks/exhaustive-deps



    return (
        <Fragment>
            <h1>My Properties</h1>

            <section className="properties">
                {properties === null || loading ? (
                    <Loading /> // Display a loading message while fetching data

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