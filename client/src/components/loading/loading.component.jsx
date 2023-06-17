import React, { Fragment } from "react";
import './loading.styles.scss';
const Loading = () => {
    return (
        <Fragment>
            <div className="loading-overlay">
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading...</p>
                </div>
            </div>


        </Fragment>

    );
}


export default Loading;