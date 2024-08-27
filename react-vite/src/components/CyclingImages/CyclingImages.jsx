import { useNavigate } from 'react-router-dom';
import coffeeImg from '../../../public/bbcoffee.jpg';
import ramenImg from '../../../public/ramen.jpg';
import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './CyclingImages.css';

const imageData = [
    { image: coffeeImg, title: "Happiness in a cup", category: "Coffee" },
    { image: ramenImg, title: "Ramen is life!", category: "Restaurant" }
];

export default function CyclingImages() {
    const [currImageIndex, setCurrImageIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrImageIndex((prevIndex) => (prevIndex + 1) % imageData.length); // Cycle through images
        }, 5000);

        return () => clearInterval(interval); // Cleanup
    }, []);

    // Function to handle search button click based on category
    const handleClick = (category) => {
        navigate(`/businesses?category=${category}`); // Navigate with search param
    };

    return (
        <div className="carousel-container">
            <div className="carousel">
                {imageData.map((imgData, index) => (
                    <div
                        key={index}
                        className={`carousel-image ${index === currImageIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${imgData.image})` }}
                    >
                        <div className="title-button-cycling-images">
                            <h3 className="title-cycling-images">{imgData.title}</h3>
                            <button className="search-button-cycling-images" onClick={() => handleClick(imageData[currImageIndex].category)}>
                                <FaSearch className="search-icon-cycling" /> {imgData.category}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
