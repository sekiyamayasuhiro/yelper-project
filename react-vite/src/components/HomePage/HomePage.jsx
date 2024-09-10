import {
    FaUtensils,
    FaShoppingBag,
    FaBiking,
    FaCar,
    FaHome,
    FaCoffee,
    FaDumbbell,
    FaCut
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllReviews } from "../../redux/review";
import { ReviewCard } from "../Reviews";
import { LoadingSpinner } from "../LoadingSpinner";

export default function HomePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true);

    const categoryIcons = {
        'Restaurant': <FaUtensils />,
        'Shopping': <FaShoppingBag />,
        'Active Life': <FaBiking />,
        'Automotive': <FaCar />,
        'Home Services': <FaHome />,
        'Coffee': <FaCoffee />,
        'Gym': <FaDumbbell />,
        'Salon': <FaCut />,
    };

    useEffect(() => {
        dispatch(getAllReviews()).then(res => {
            const sortedReviews = res.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setReviews(sortedReviews);
            setLoading(false)
        })
    }, [dispatch])

    const handleClick = (cat) => {
        navigate(`/businesses?category=${cat}`)
    }

    if (loading) return <LoadingSpinner />

    return (
        <div className="homepage-container">
            {reviews.length > 0 && <div className="homepage-section">
                <h2>Recent Activity</h2>

                <div className="recent-activity-container">
                    {reviews.map((review, index) => (
                        <ReviewCard key={index} review={review}/>
                    ))}
                </div>
            </div>}
            <div className="homepage-section">
                <h2>Categories</h2>
                <div className="categories-container">
                    {Object.keys(categoryIcons).map((cat, index) => (
                        <div key={index} className="category-card" onClick={() => handleClick(cat)}>
                            <div className="icon">{categoryIcons[cat]}</div>
                            <div className="category-name">{cat}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
