import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { queryBusinesses } from '../../redux/business.js';

const SearchBar = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const businesses = useSelector(state => Object.values(state.businessState) ? Object.values(state.businessState) : []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const searchTerms = {
            name,
            category,
            price,
        };

        await dispatch(queryBusinesses(searchTerms));
        setIsLoaded(true);
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                    <input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Category"
                    />
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price"
                    />
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>

    );
};

export default SearchBar;
