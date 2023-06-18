import React, { Fragment, useEffect, useState } from "react";
import './listProperties.styles.scss';
import Property from "../property/property.component";
import Pagination from "../pagination/pagination.component";
import Loading from "../loading/loading.component";


const ListProperties = () => {

    const [properties, setProperties] = useState(null);
    const [totalPages, setTotalPages] = useState();
    const [totalProperties, setTotalProperties] = useState();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    let tries = 0; //tries if fetch fails - max 10
    const getProperties = async (page = 1) => {

        try {
            console.log("Tries:", tries);
            setLoading(true);
            console.log("Getproperties");
            const response = await fetch(`http://localhost:5000/properties?page=${page}`);
            console.log();
            const responseJSON = await response.json();
            setCurrentPage(page);
            setProperties(responseJSON.data);
            setTotalPages(responseJSON.pagination.totalPages)
            setTotalProperties(responseJSON.pagination.totalProperties);
            console.log(totalPages);
            window.scrollTo(0, 0); //for mobile, because otherwise stays at the bottom

            setTimeout(() => {
                setLoading(false);
            }, 500);


        } catch (error) {
            console.log(error.message);
            if (error.message === 'Failed to fetch' && tries < 10) { //10 tries to fetch
                tries++;
                setTimeout(getProperties, 1000); //after 1s wil ltry to fetch again
            }
        }
    }

    useEffect(() => {
        getProperties();
        console.log("Use effect");
    }, []);// eslint-disable-line react-hooks/exhaustive-deps




    return (
        <Fragment>
            <header>
                <h1 onClick={() => getProperties()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                    </svg>
                    My Properties
                </h1>
                <hr />
            </header>

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
                <Pagination getProperties={getProperties} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} totalProperties={totalProperties} />
            </footer>
        </Fragment >

    );
}


export default ListProperties;