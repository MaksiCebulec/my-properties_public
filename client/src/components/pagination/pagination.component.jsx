import React, { Fragment, useState } from "react";
import './pagination.styles.scss';


const Pagination = ({ setCurrentPage, currentPage, getProperties, totalPages, totalProperties }) => {




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

    const pages = getPageRange();

    return (
        <Fragment>
            <div className="pagination">
                <ul className="pagination-list">
                    <li className={`pagination-item ${currentPage === 1 ? 'hidden' : ''}`}>
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
                    {pages.map((page) => {
                        return (<li key={page} className="pagination-item">
                            <button onClick={() => { onClick(page) }} className={`pagination-button ${currentPage === page ? 'active' : ''}`}>{page}</button>
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
                    <li className={`pagination-item ${currentPage === totalPages ? 'hidden' : ''}`}>
                        <button onClick={nextPage} className="pagination-button">&raquo;</button>
                    </li>

                </ul>
            </div>
            <h4>Showing {(currentPage * 21) - 20} - {currentPage * 21} of {totalProperties} properties.</h4>
        </Fragment >

    );
}

export default Pagination;