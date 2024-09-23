import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

const StarRating = ({ rating }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Define the star color
    const starColor = '#ff8343';

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="star full-star" style={{ color: starColor }} />,
        );
    }

    // Add half star if needed
    if (hasHalfStar) {
        stars.push(
            <FontAwesomeIcon key="half" icon={faStarHalfAlt} className="star half-star" style={{ color: starColor }} />,
        );
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars.push(
            <FontAwesomeIcon
                key={`empty-${i}`}
                icon={faStar}
                className="star empty-star"
                style={{ color: starColor }}
            />,
        );
    }

    return (
        <div className="star-rating">
            <span className="rating-number">{rating.toFixed(1)}</span>
            {stars}
        </div>
    );
};

export default StarRating;
