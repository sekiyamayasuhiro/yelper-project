// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { getAllBusinesses } from "../../redux/business";
// import { useNavigate } from "react-router-dom";
// import "./SearchBar.css";

// function SearchBar() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [name, setName] = useState("");
//     const [location, setLocation] = useState("")
//     const [price, setPrice] = useState("");
//     const [category, setCategory] = useState("");
//     const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

//     const prices = { 1: "$", 2: "$$", 3: "$$$", 4: "$$$$" };
//     const categories = ["Restaurant", "Coffee", "Gym", "Salon"];

//     const handleToggle = (type, value) => {
//         navigate("/");
//         if (type === "category") {
//             setCategory((prevCategory) =>
//                 prevCategory === value ? "" : value
//             );
//         } else if (type === "price") {
//             setPrice((prevPrice) => (prevPrice === +value ? "" : +value));
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         navigate("/");
//         dispatch(getAllBusinesses({ name, location, price, category }, navigate));
//     };


//     return (
//         <div>
//             <form className="search-bar" onSubmit={handleSubmit}>
//                 <div className="input-group">
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Business Name"
//                         className="name"
//                     />
//                     <input
//                         type="text"
//                         value={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                         placeholder="address, city, state or zip"
//                         className="name"
//                     />
//                     <div className="price-category">
//                         <span>
//                             Category
//                             <div className="category">
//                                 {categories.map((cat, index) => (
//                                     <button
//                                         key={index}
//                                         value={cat}
//                                         onClick={() =>
//                                             handleToggle("category", cat)
//                                         }
//                                         className={
//                                             category === cat ? "active" : ""
//                                         }
//                                     >
//                                         {cat}
//                                     </button>
//                                 ))}
//                             </div>
//                         </span>
//                         <span>
//                             Price
//                             <div className="price">
//                                 {Object.entries(prices).map(([key, val]) => {
//                                     return (
//                                         <button
//                                             key={key}
//                                             value={key}
//                                             onClick={() =>
//                                                 handleToggle("price", key)
//                                             }
//                                             className={
//                                                 price === Number(key)
//                                                     ? "active"
//                                                     : ""
//                                             }
//                                         >
//                                             {val}
//                                         </button>
//                                     );
//                                 })}
//                             </div>
//                         </span>
//                     </div>
//                 </div>
//                 <button>Search</button>
//             </form>
//         </div>
//     );
// }

// export default SearchBar;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBusinesses } from "../../redux/business";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import "./SearchBar.css";

function SearchBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const urlLocation = useLocation();
    const isHomePage = urlLocation.pathname === '/';

    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");

    const categories = ["Restaurant", "Coffee", "Gym", "Salon"];

    const handleToggle = (type, value) => {
        if (type === "category") {
            setCategory((prevCategory) => prevCategory === value ? "" : value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/");
        dispatch(getAllBusinesses({ name, location, category }, navigate));
    };

    return (
        <div className={isHomePage ? "search-bar-container home-page" : "search-bar-container other-page"}>
            <form className="search-bar" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Business Name"
                        className="name"
                    />
                    <div className="separator"></div>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
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
                                value={cat}
                                onClick={() => handleToggle("category", cat)}
                                className={`dropdown-item ${category === cat ? "active" : ""}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;
