import React, { Fragment, useState, useEffect } from "react";
import './pagination.styles.scss';


const Pagination = ({ setCurrentPage, currentPage, getProperties, totalPages, totalProperties }) => {


    const [pageRange, setPageRange] = useState([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(isMobileCheck());

    }, []);

    function isMobileCheck() {
        const screenWidth = window.innerWidth;
        console.log("Screen width: ", screenWidth);

        if (screenWidth < 768) {
            return true;
        } else {
            return false;
        }
    }





    function getPageRange() {

        const minPage = Math.max(currentPage - 2, 1);
        const maxPage = Math.min(currentPage + 2, totalPages);


        // return Array.from({ length: maxPage - minPage + 1 }, (_, index) => minPage + index);

        const pages = [];

        for (let i = minPage; i <= maxPage; i++) {
            if (i !== 1 && i !== totalPages) {
                pages.push(i);
            }
        }

        return pages;
    }




    function nextPage() {
        const nextPage = currentPage + 1;
        // setCurrentPage(nextPage);
        getProperties(nextPage);
    }

    function previousPage() {
        const nextPage = currentPage - 1;
        // setCurrentPage(nextPage);
        getProperties(nextPage);

    }


    function onClick(page) {
        getProperties(page);
        // setCurrentPage(page); //it already do this in getProperties
    }

    useEffect(() => {
        setPageRange(getPageRange());
    }, [currentPage, totalPages]);

    let startProperty = (currentPage - 1) * 21 + 1;
    let endProperty = currentPage * 21;

    if (endProperty > totalProperties) {
        endProperty = totalProperties;
    }

    // Adjust startProperty if it exceeds totalProperties
    if (startProperty > totalProperties) {
        startProperty = totalProperties;
    }

    // const pages = getPageRange();

    return (
        <Fragment>
            <div className="pagination">
                {isMobile ? (
                    <div className="arrow-row">
                        <button onClick={nextPage} className={`pagination-button next-page-button ${currentPage === totalPages ? 'hidden' : ''}`}>Previous page</button>
                        <button onClick={nextPage} className={`pagination-button prev-page-button ${currentPage === totalPages ? 'hidden' : ''}`}>Next Page</button>
                    </div>
                ) : (
                    ''
                )}

                <ul className="pagination-list">
                    <li className={`pagination-item ${currentPage === 1 || isMobile ? 'hidden' : ''}`}>
                        <button href="" onClick={previousPage} className="pagination-button">&laquo;</button>
                    </li>
                    <li className={`pagination-item`}>
                        <button href="" onClick={() => onClick(1)} className={`pagination-button ${currentPage === 1 ? 'active' : ''}`}>1</button>
                    </li>
                    {currentPage > 4 ? (
                        <li className={`pagination-item`}>
                            <span>...</span>
                        </li>
                    ) : (
                        ''
                    )}
                    {pageRange.map((page) => {
                        return (<li key={page} className="pagination-item">
                            <button href="#h1" onClick={() => { onClick(page) }} className={`pagination-button ${currentPage === page ? 'active' : ''}`}>{page}</button>
                        </li>)
                    })}
                    {currentPage < (totalPages - 4) ? (
                        <li className={`pagination-item`}>
                            <span>...</span>
                        </li>
                    ) : (
                        ''
                    )}
                    <li className={`pagination-item`}>
                        <button href="" onClick={() => onClick(totalPages)} className={`pagination-button ${currentPage === totalPages ? 'active' : ''}`}>{totalPages}</button>
                    </li>
                    <li className={`pagination-item ${currentPage === totalPages || isMobile ? 'hidden' : ''}`}>
                        <button onClick={nextPage} className="pagination-button">&raquo;</button>
                    </li>

                </ul>

            </div>
            <h4>Showing {startProperty} - {endProperty} of {totalProperties} properties.</h4>
        </Fragment >

    );
}

export default Pagination;