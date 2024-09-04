import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNewBusiness } from "../../redux/business.js";
import './CreateBusinessForm.css'

const CreateBusinessForm = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [category, setCategory] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const country = 'USA'

    const [validationErrors, setValidationErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector((state) => state.session.user);

    // Checking for logged in user.
    useEffect(() => {
        if (!sessionUser) {
            navigate("/");
        }
    }, [sessionUser, navigate]);

    useEffect(() => {
        const resetForm = () => {
            setValidationErrors({});
            setName("");
            setAddress("");
            setCity("");
            setState("");
            setPostalCode("");
            setLat("");
            setLng("");
            setCategory("");
            setPhoneNumber("");
            setWebsite("");
            setDescription("");
            setPrice("");
        };

        return () => {
            resetForm();
        };
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        // Regex for validating business name: allows a-z, A-Z, 0-9, and '
        const nameRegex = /^[a-zA-Z0-9' ]+$/;

        if (!name) {
            errors.name = "Name is required";
        } else if (!nameRegex.test(name)) {
            errors.name = "Name can only contain letters (a-z), numbers (0-9), and apostrophes (')";
        }

        if (!address) {
            errors.address = "Address is required";
        }
        if (!city) {
            errors.city = "City is required";
        }
        if (!state) {
            errors.state = "State is required";
        }

        if (description.length < 30) {
            errors.description = "Description needs a minimum of 30 characters";
        }
        if (postalCode.length > 5) errors.postalCode = 'Please enter up to 5 digits only'



        if (!lat || isNaN(lat) || lat < -90 || lat > 90) {
            errors.lat = "Lat must be between -90 and 90.";
        }
        if (!lng || isNaN(lng) || lng < -180 || lng > 180) {
            errors.lng = "Lng must be between -180 and 180.";
        }
        if (!category) {
            errors.category = "Please select a category";
        }
        if (!phoneNumber) {
            errors.phoneNumber = "Phone number is required";
        }
        if (phoneNumber.length > 10) errors.phoneNumber = 'Phone number must be exactly 10 digits.'
        if (!website) {
            errors.website = "Please provide a URL to your business.";
        }
        if (!price) {
            errors.price = "Please select a price level";
        }

        if (Object.values(errors).length) {
            setValidationErrors(errors);
            return;
        }

        const newBusinessFormData = {
            owner_id: sessionUser.id,
            name,
            address,
            city,
            state,
            country,
            postal_code: postalCode,
            lat,
            lng,
            category,
            phone_number: phoneNumber,
            website,
            description,
            price,
        };

        const newBusiness = await dispatch(
            createNewBusiness(newBusinessFormData)
        );

        if (newBusiness) {
            navigate(`/businesses/${newBusiness.id}`);
        }
    };

    const toTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        // Format the value and limit to 30 characters
        if (value.length <= 30) {
            setName(toTitleCase(value));
        }
    };

       // Handler for address change
       const handleAddressChange = (e) => {
        const value = e.target.value;
        // Format the value and limit to 50 characters
        if (value.length <= 50) {
            setAddress(toTitleCase(value));
        }
    };

    // Handler for city change
    const handleCityChange = (e) => {
        const value = e.target.value;
        // Format the value and limit to 45 characters
        if (value.length <= 45) {
            setCity(toTitleCase(value));
        }
    };

    return (
        <div className="create-businesss-page">
            <form
                className="create-business-form"
                onSubmit={handleSubmit}
                noValidate
            >
                <h1>Create a New Business</h1>


                    <h2>Please provide the details of your business.</h2>
                    <h3>
                        Reminder: The more accurate and detailed you are will
                        help future customers!
                    </h3>
                    <div className="form-fields">

                    <div className="label-container">

                        {validationErrors.name && (
                            <span className="errors">
                                {validationErrors.name}
                            </span>
                        )}
                        {name.length >= 30 && <p style={{ color: 'gray'}}>You have reached the max length of 30 characters</p>}
                    </div>
                    <input
                        type="text"
                        name="business-name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder="Business Name"
                        maxLength={30}
                    />

                    <div className="label-container">

                        {validationErrors.address && (
                            <span className="errors">
                                {validationErrors.address}
                            </span>
                        )}
                        {address.length >= 50 && <p style={{ color: 'gray'}}>You have reached the max length of 50 characters</p>}
                    </div>
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={handleAddressChange}
                        placeholder="Address"
                        maxLength={50}
                    />

                    <div className="label-container">

                        {validationErrors.city && (
                            <span className="errors">
                                {validationErrors.city}
                            </span>
                        )}
                        {city.length >= 45 && <p style={{ color: 'gray'}}>You have reached the max length of 45 characters</p>}

                    </div>
                    <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={handleCityChange}
                        placeholder="City (San Francisco)"
                        maxLength={45}
                    />

                    <div className="label-container">

                        {validationErrors.state && (
                            <span className="errors">
                                {validationErrors.state}
                            </span>
                        )}
                    </div>
                    <input
                        type="text"
                        name="state"
                        value={state}
                        onChange={(e) => setState(e.target.value.toUpperCase())}
                        placeholder="State (CA)"
                        maxLength={2}
                    />

                    <div className="label-container">

                        {validationErrors.country && (
                            <span className="errors">
                                {validationErrors.country}
                            </span>
                        )}
                    </div>
                    <input
                        type="text"
                        name="country"
                        value={country}
                        disabled
                    />

                    <div className="label-container">

                        {validationErrors.postalCode && (
                            <span className="errors">
                                {validationErrors.postalCode}
                            </span>
                        )}
                    </div>
                    <input
                        type="number"
                        name="postal-code"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Zip Code (5 digits)"
                        maxLength={5}

                    />

                    <div className="label-container">

                        {validationErrors.lat && (
                            <span className="errors">
                                {validationErrors.lat}
                            </span>
                        )}
                    </div>
                    <input
                        type="number"
                        name="latitude"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        placeholder="Latitude (-90 to 90)"
                    />

                    <div className="label-container">

                        {validationErrors.lng && (
                            <span className="errors">
                                {validationErrors.lng}
                            </span>
                        )}
                    </div>
                    <input
                        type="number"
                        name="longitude"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        placeholder="Longitude (-180 to 180)"
                    />

                    <div className="label-container">

                        {validationErrors.category && (
                            <span className="errors">
                                {validationErrors.category}
                            </span>
                        )}
                    </div>
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Coffee">Coffee</option>
                        <option value="Gym">Gym</option>
                        <option value="Salon">Salon</option>
                    </select>

                    <div className="label-container">

                        {validationErrors.phoneNumber && (
                            <span className="errors">
                                {validationErrors.phoneNumber}
                            </span>
                        )}
                    </div>
                    <input
                        type="number"
                        name="phone-number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number (10 digits)"
                    />

                    <div className="label-container">

                        {validationErrors.website && (
                            <span className="errors">
                                {validationErrors.website}
                            </span>
                        )}
                    </div>
                    {website.length > 49 && <p>You have reached the max of 50 characters</p>}
                    <input
                        type="text"
                        name="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Website URL"
                        maxLength={50}
                    />

                    <div className="label-container">

                        {validationErrors.description && (
                            <div className="errors">
                                {validationErrors.description}
                            </div>
                        )}
                    </div>
                    {description.length > 449 && <p>You have reached the max of 450 characters</p>}
                    <textarea
                        name="description"
                        rows="5"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description (Min. 30 characters)"
                        maxLength={450}
                    ></textarea>

                    <div className="label-container">

                        {validationErrors.price && (
                            <div className="errors">
                                {validationErrors.price}
                            </div>
                        )}
                    </div>
                    <select
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    >
                        <option value="">Select Price Level</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                    </select>
                    <div>
                    <button type="submit">Create Business</button>
                </div>
                    </div>


            </form>
        </div>
    );
};

export default CreateBusinessForm;
