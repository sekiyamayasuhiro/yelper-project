import { GoStarFill } from "react-icons/go";
import { FaStarHalf } from "react-icons/fa";


const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="star-rating">
           {[...Array(fullStars)].map((_, index) => (
            <span key={index} className="star">
              <span className="star-icon"><GoStarFill /></span>
            </span>
          ))}
          {halfStar && (
            <span >
            <span className="star"><span className="star-icon"><FaStarHalf /></span></span>
            </span>
          )}
          {[...Array(emptyStars)].map((_, index) => (
            <span key={index} className="star empty">
              <span className="star-icon"><GoStarFill /></span>
            </span>
          ))}
        </div>
    );
};

export default StarRating
