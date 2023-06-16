import React, { useState } from 'react';



const Property = ({ property }) => {

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    const handleClickNextPhoto = () => {
        const totalPhotos = property.photos.length;
        const nextPhotoIndex = (currentPhotoIndex + 1) % totalPhotos;
        setCurrentPhotoIndex(nextPhotoIndex);
    };

    const handleClickPreviousPhoto = () => {
        const totalPhotos = property.photos.length;
        const previousPhotoIndex = (currentPhotoIndex - 1 + totalPhotos) % totalPhotos;
        setCurrentPhotoIndex(previousPhotoIndex);
    };



    return (
        <div className="property">
            <div className="text">
                <h4 className="title">{property.title}</h4>
                <h6 className="location">{property.location}</h6>
            </div>
            <div className="photos">
                <img
                    src={property.photos[currentPhotoIndex]}
                    alt={`Image ${currentPhotoIndex + 1}`}
                />
                <div className="photo-buttons">
                    <button onClick={handleClickPreviousPhoto}>Previous</button>
                    <button onClick={handleClickNextPhoto}>Next</button>
                </div>
            </div>
        </div>
    );
}


export default Property;