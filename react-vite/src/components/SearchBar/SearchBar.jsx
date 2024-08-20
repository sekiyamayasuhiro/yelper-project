import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBusinesses } from "../../redux/business";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");

    const prices = { 1: "$", 2: "$$", 3: "$$$", 4: "$$$$" };
    const categories = ["Restaurant", "Coffee", "Gym", "Salon"];

    const handleToggle = (type, value) => {
        navigate("/");
        if (type === "category") {
            setCategory((prevCategory) =>
                prevCategory === value ? "" : value
            );
        } else if (type === "price") {
            setPrice((prevPrice) => (prevPrice === +value ? "" : +value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/");
        dispatch(getAllBusinesses({ name, location, price, category }, navigate));
    };


    return (
        <div>
            <form className="search-bar" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Business Name"
                        className="name"
                    />
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="address, city, state or zip"
                        className="name"
                    />
                    <div className="price-category">
                        <span>
                            Category
                            <div className="category">
                                {categories.map((cat, index) => (
                                    <button
                                        key={index}
                                        value={cat}
                                        onClick={() =>
                                            handleToggle("category", cat)
                                        }
                                        className={
                                            category === cat ? "active" : ""
                                        }
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </span>
                        <span>
                            Price
                            <div className="price">
                                {Object.entries(prices).map(([key, val]) => {
                                    return (
                                        <button
                                            key={key}
                                            value={key}
                                            onClick={() =>
                                                handleToggle("price", key)
                                            }
                                            className={
                                                price === Number(key)
                                                    ? "active"
                                                    : ""
                                            }
                                        >
                                            {val}
                                        </button>
                                    );
                                })}
                            </div>
                        </span>
                    </div>
                </div>
                <button>Search</button>
            </form>
        </div>
    );
}

export default SearchBar;
