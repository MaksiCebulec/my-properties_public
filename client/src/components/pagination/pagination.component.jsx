import React, { Fragment, useState } from "react";
import './pagination.styles.scss';


const Pagination = ({ getProperties, totalPages }) => {

    const [currentPage, setCurrentPage] = useState(1);


    // function getPageRange() {
    //     const minPage = currentPage - 5;

    //     if(minPage<1){

    //     }
    //     const maxPage = currentPage + 5;
    // }

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    function nextPage() {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getProperties(nextPage);
    }

    function previousPage() {
        const nextPage = currentPage - 1;
        setCurrentPage(nextPage);
        getProperties(nextPage);

    }


    function onClick(page) {
        getProperties(page);
        setCurrentPage(page);
    }
    return (
        <Fragment>
            <div className="pagination">
                <ul className="pagination-list">
                    <li className={`pagination-item ${currentPage === 1 ? 'hidden' : ''}`}>
                        <button href="" onClick={previousPage} className="pagination-button">&laquo;</button>
                    </li>
                    {pages.map((page) => {
                        return (<li key={page} className="pagination-item">
                            <button onClick={() => { onClick(page) }} className={`pagination-button ${currentPage === page ? 'active' : ''}`}>{page}</button>
                        </li>)
                    })}
                    <li className={`pagination-item ${currentPage === totalPages ? 'hidden' : ''}`}>
                        <button onClick={nextPage} className="pagination-button">&raquo;</button>
                    </li>
                </ul>
            </div>
            <h5>Current page: {currentPage}</h5>
        </Fragment >

    );
}

export default Pagination;