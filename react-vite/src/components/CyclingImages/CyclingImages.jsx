import ramenImg from '../../../public/ramen.jpg'
import coffeeImg from '../../../public/coffee.jpg'
import { useEffect, useState } from 'react'
import './CyclingImages.css'


const images = [ramenImg, coffeeImg]

export default function CyclingImages () {
    const [currImageIndex, setCurrImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className='carousel'>
            {images.map((image, index) => (
                <div
                key={index}
                className={`carousel-image ${
                    index === currImageIndex ? "active" : ""
                }`}
                style={{ backgroundImage: `url(${image})` }}
            />
            ))}
        </div>
    )
}
