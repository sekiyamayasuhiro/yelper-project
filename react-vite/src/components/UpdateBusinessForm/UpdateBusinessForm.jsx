import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBusiness } from "../../redux/business.js";

const UpdateBusinessForm = () => {
    const { businessId } = useParams();
    const business = useSelector((state) =>
        state.businessState[businessId] ? state.businessState[businessId] : []
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector((state) => state.session.user);

    const [name, setName] = useState(business.name);
    const [address, setAddress] = useState(business.address);
    const [city, setCity] = useState(business.city);
    const [state, setState] = useState(business.state);
    const [country, setCountry] = useState(business.country);
    const [postalCode, setPostalCode] = useState(business.postal_code);
    const [category, setCategory] = useState(business.category);
    const [phoneNumber, setPhoneNumber] = useState(business.phone_number);
    const [website, setWebsite] = useState(business.website);
    const [description, setDescription] = useState(business.description);
    const [price, setPrice] = useState(business.price);

    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!name) {
            errors.name = "Name is required";
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
        if (!country) {
            errors.country = "Country is required";
        }
        if (description.length < 30) {
            errors.description = "Description needs a minimum of 30 characters";
        }
        if (!postalCode || !/^\d{5}$/.test(postalCode)) {
            errors.postalCode =
                "Postal code must be exactly 5 digits and all numeric";
        }
        if (!category) {
            errors.category = "Please select a category";
        }
        if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
            errors.phoneNumber = "Phone number must be exactly 10 digits";
        }
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

        const updateBusinessData = {
            id: businessId,
            owner_id: sessionUser.id,
            name,
            address,
            city,
            state,
            country,
            postal_code: postalCode,
            category,
            phone_number: phoneNumber,
            website,
            description,
            price,
        };

        const updatedBusiness = await dispatch(
            updateBusiness(updateBusinessData)
        );

        if (updatedBusiness) {
            navigate(`/businesses/${updatedBusiness.id}`);
        } else {
            navigate(`/businesses/${businessId}`);
        }
    };

    return (
        <div className="update-businesss-page">
            <form
                className="update-business-form"
                onSubmit={handleSubmit}
                noValidate
            >
                <h1>Update a New Business</h1>

                <section>
                    <h2>Please provide the Details of your business.</h2>
                    <h3>
                        The more accurate and detailed you are will help future
                        customers!
                    </h3>

                    <div className="label-container">
                        <label>Business Name</label>
                        {validationErrors.name && (
                            <span className="errors">
                                {validationErrors.name}
                            </span>
                        )}
                    </div>
                    <input
                        type="text"
                        name="business-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Business Name"
                    />

                    <div className="label-container">
                        <label>Address</label>
                        {validationErrors.address && (
                            <span className="errors">
                                {validationErrors.address}
                            </span>
                        )}
                    </div>
                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                    />

                    <div className="label-container">
                        <label>City</label>
                        {validationErrors.city && (
                            <span className="errors">
                                {validationErrors.city}
                            </span>
                        )}
                    </div>
                    <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                    />

                    <div className="label-container">
                        <label>State</label>
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
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                    />

                    <div className="label-container">
                        <label>Country</label>
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
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                    />

                    <div className="label-container">
                        <label>Postal Code</label>
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
                        placeholder="Postal Code"
                    />

                    <div className="label-container">
                        <label>Category</label>
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
                        <label>Phone Number</label>
                        {validationErrors.phoneNumber && (
                            <span className="errors">
                                {validationErrors.phoneNumber}
                            </span>
                        )}
                    </div>
                    <input
                        type="text"
                        name="phone-number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                    />

                    <div className="label-container">
                        <label>Website</label>
                        {validationErrors.website && (
                            <span className="errors">
                                {validationErrors.website}
                            </span>
                        )}
                    </div>
                    <input
                        type="text"
                        name="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Website URL"
                    />

                    <div className="label-container">
                        <label>Description</label>
                        {validationErrors.description && (
                            <div className="errors">
                                {validationErrors.description}
                            </div>
                        )}
                    </div>
                    <textarea
                        name="description"
                        rows="5"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    ></textarea>

                    <div className="label-container">
                        <label>Price</label>
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
                </section>

                <div>
                    <button type="submit">Update Business</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBusinessForm;
