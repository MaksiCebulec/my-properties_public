import React, { Fragment, useState } from "react";
import './pagination.styles.scss';


const Pagination = ({ getProperties, totalPages }) => {

    const [currentPage, setCurrentPage] = useState(1);

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
                        <a href="#" onClick={previousPage} className="pagination-link">&laquo;</a>
                    </li>
                    {pages.map((page) => {
                        return (<li key={page} className="pagination-item">
                            <a href="#" onClick={() => { onClick(page) }} className={`pagination-link ${currentPage === page ? 'active' : ''}`}>{page}</a>
                        </li>)
                    })}
                    <li className={`pagination-item ${currentPage === totalPages ? 'hidden' : ''}`}>
                        <a href="#" onClick={nextPage} className="pagination-link">&raquo;</a>
                    </li>
                </ul>
            </div>
            <h5>Current page: {currentPage}</h5>
        </Fragment >

    );
}

export default Pagination;