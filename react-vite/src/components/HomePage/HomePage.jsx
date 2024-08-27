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

export default function HomePage() {
    const navigate = useNavigate()
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

    const handleClick = (cat) => {
        navigate(`/businesses?category=${cat}`)


    }

    return (
        <div className="homepage-container">
            <div className="homepage-section">
                <h2>Recent Activity</h2>
                <div className="recent-activity-container"></div>
            </div>

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
