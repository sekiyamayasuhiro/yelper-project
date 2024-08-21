import coffeeImg from '../../../public/bbcoffee.jpg';
import ramenImg from '../../../public/ramen.jpg';
import { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import './CyclingImages.css';

const images = [coffeeImg, ramenImg];

export default function CyclingImages() {
    const [currImageIndex, setCurrImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="carousel-container">
            <div className="carousel">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`carousel-image ${index === currImageIndex ? "active" : ""}`}
                        style={{ backgroundImage: `url(${image})` }}
                    >
                        {index === images.indexOf(coffeeImg) && (
                            <div className="title-button-cycling-images">
                                <h3 className="title-cycling-images">Happiness in a cup</h3>
                                <button className="search-button-cycling-images">
                                    <FaSearch className="search-icon-cycling" /> Coffee
                                </button>
                            </div>
                        )}
                        {index === images.indexOf(ramenImg) && (
                            <div className="title-button-cycling-images">
                                <h3 className="title-cycling-images">Ramen is life!</h3>
                                <button className="search-button-cycling-images">
                                    <FaSearch className="search-icon-cycling" /> Ramen
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
