import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllBusinesses } from "../../redux/business";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaUtensils, FaShoppingBag, FaRunning, FaCar, FaHome, FaCoffee, FaDumbbell } from 'react-icons/fa';
import "./SearchBar.css";

function SearchBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const isHomePage = location.pathname === '/';

    const [name, setName] = useState("");
    const [locationSearch, setLocationSearch] = useState("");
    const [category, setCategory] = useState("");

    const categories = [
        { name: 'Restaurant', icon: <FaUtensils /> },
        { name: 'Shopping', icon: <FaShoppingBag /> },
        { name: 'Active Life', icon: <FaRunning /> },
        { name: 'Automotive', icon: <FaCar /> },
        { name: 'Home Services', icon: <FaHome /> },
        { name: 'Coffee', icon: <FaCoffee /> },
        { name: 'Gym', icon: <FaDumbbell /> },
        { name: 'Salon', icon: <FaUtensils /> }
    ];

    useEffect(() => {
        // Parse the URL search params
        const params = new URLSearchParams(location.search);
        setName(params.get('name') || '');
        setLocationSearch(params.get('find_loc') || '');
        setCategory(params.get('category') || '');
    }, [location.search]);

    // Update URL search parameters and navigate
    const updateSearchParams = () => {
        const params = new URLSearchParams();
        if (name) params.set('name', name);
        if (locationSearch) params.set('find_loc', locationSearch);
        if (category) params.set('category', category);

        navigate(`/businesses?${params.toString()}`);
    };

    const handleCategoryClick = (value) => {
        setCategory(value);
        setName(value);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear category and set empty search params if search inputs are empty
        if (name === '' && locationSearch === '') {
            setCategory('')
            navigate('/businesses');
            dispatch(getAllBusinesses({ name: '', location: '', category: '' }));
        } else {
            // Update search params and navigate
            updateSearchParams();

            // Dispatch action with search parameters
            dispatch(getAllBusinesses({ name, location: locationSearch, category }));
        }
    };

    return (
        <div className={isHomePage ? "search-bar-container home-page" : "search-bar-container other-page"}>
            <form className="search-bar" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Business Name, Category"
                        className="name"
                    />
                    <div className="separator"></div>
                    <input
                        type="text"
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        placeholder="Address, city, state or zip"
                        className="location"
                    />
                    <button type="submit" className="search-icon">
                        <FaSearch />
                    </button>
                </div>
                <div className="category-dropdown">
                    <p>
                        Categories <span className="arrow"><IoIosArrowDown /></span>
                    </p>
                    <div className="dropdown-content">
                        {categories.map((cat, index) => (
                            <button
                                key={index}
                                value={cat.name}
                                onClick={() => handleCategoryClick(cat.name)}
                                className={`dropdown-item ${category === cat.name ? "active" : ""}`}
                            >
                                <span className="cat-icon">{cat.icon}</span> {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;
