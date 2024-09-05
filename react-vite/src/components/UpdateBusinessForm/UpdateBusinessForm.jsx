// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { updateBusiness } from "../../redux/business.js";

// const UpdateBusinessForm = () => {
//     const { businessId } = useParams();

//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const business = useSelector((state) => state.businessState[businessId]);
//     const sessionUser = useSelector((state) => state.session.user);

//     // Checking for auth and business, initially there was error when logging out while in manage business
//     useEffect(() => {
//         if (!sessionUser || !business || sessionUser.id !== business.owner_id) {
//             navigate("/");
//         }
//     }, [business, sessionUser, navigate]);

//     const [name, setName] = useState(business.name);
//     const [address, setAddress] = useState(business.address);
//     const [city, setCity] = useState(business.city);
//     const [state, setState] = useState(business.state);
//     const [country, setCountry] = useState(business.country);
//     const [postalCode, setPostalCode] = useState(business.postal_code);
//     const [lat, setLat] = useState(business.lat);
//     const [lng, setLng] = useState(business.lng);
//     const [category, setCategory] = useState(business.category);
//     const [phoneNumber, setPhoneNumber] = useState(business.phone_number);
//     const [website, setWebsite] = useState(business.website);
//     const [description, setDescription] = useState(business.description);
//     const [price, setPrice] = useState(business.price);

//     const [validationErrors, setValidationErrors] = useState({});

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const errors = {};

//         if (!name) {
//             errors.name = "Name is required";
//         }
//         if (!address) {
//             errors.address = "Address is required";
//         }
//         if (!city) {
//             errors.city = "City is required";
//         }
//         if (!state) {
//             errors.state = "State is required";
//         }
//         if (!country) {
//             errors.country = "Country is required";
//         }
//         if (description.length < 30) {
//             errors.description = "Description needs a minimum of 30 characters";
//         }
//         if (!postalCode || !/^\d{5}$/.test(postalCode)) {
//             errors.postalCode =
//                 "Postal code must be exactly 5 digits and all numeric";
//         }
//         if (!lat || isNaN(lat) || lat < -90 || lat > 90) {
//             errors.lat = "Lat must be between -90 and 90.";
//         }
//         if (!lng || isNaN(lng) || lng < -180 || lng > 180) {
//             errors.lng = "Lng must be between -180 and 180.";
//         }
//         if (!category) {
//             errors.category = "Please select a category";
//         }
//         if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
//             errors.phoneNumber = "Phone number must be exactly 10 digits";
//         }
//         if (!website) {
//             errors.website = "Please provide a URL to your business.";
//         }
//         if (!price) {
//             errors.price = "Please select a price level";
//         }

//         if (Object.values(errors).length) {
//             setValidationErrors(errors);
//             return;
//         }

//         const updateBusinessData = {
//             id: businessId,
//             owner_id: sessionUser.id,
//             name,
//             address,
//             city,
//             state,
//             country,
//             postal_code: postalCode,
//             lat,
//             lng,
//             category,
//             phone_number: phoneNumber,
//             website,
//             description,
//             price,
//         };

//         const updatedBusiness = await dispatch(
//             updateBusiness(updateBusinessData)
//         );

//         if (updatedBusiness) {
//             navigate(`/businesses/${updatedBusiness.id}`);
//         } else {
//             navigate(`/businesses/${businessId}`);
//         }
//     };

//     return (
//         <div className="update-businesss-page">
//             <form
//                 className="update-business-form"
//                 onSubmit={handleSubmit}
//                 noValidate
//             >
//                 <h1>Update {business.name}</h1>

//                 <section>
//                     <h2>Please change the details of your business.</h2>
//                     <h3>
//                         Reminder: The more accurate and detailed you are will
//                         help future customers!
//                     </h3>

//                     <div className="label-container">
//                         <label>Business Name</label>
//                         {validationErrors.name && (
//                             <span className="errors">
//                                 {validationErrors.name}
//                             </span>
//                         )}
//                     </div>
//                     <input
//                         type="text"
//                         name="business-name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         placeholder="Business Name"
//                     />

//                     <div className="label-container">
//                         <label>Address</label>
//                         {validationErrors.address && (
//                             <span className="errors">
//                                 {validationErrors.address}
//                             </span>
//                         )}
//                     </div>
//                     <input
//                         type="text"
//                         name="address"
//                         value={address}
//                         onChange={(e) => setAddress(e.target.value)}
//                         placeholder="Address"
//                     />

//                     <div className="label-container">
//                         <label>City</label>
//                         {validationErrors.city && (
//                             <span className="errors">
//                                 {validationErrors.city}
//                             </span>
//                         )}
//                     </div>
//                     <input
//                         type="text"
//                         name="city"
//                         value={city}
//                         onChange={(e) => setCity(e.target.value)}
//                         placeholder="City (San Francisco)"
//                     />

//                     <div className="label-container">
//                         <label>State</label>
//                         {validationErrors.state && (
//                             <span className="errors">
//                                 {validationErrors.state}
//                             </span>
//                         )}
//                     </div>
//                     <input
//                         type="text"
//                         name="state"
//                         value={state}
//                         onChange={(e) => setState(e.target.value)}
//                         placeholder="State (CA)"
//                     />

//                     <div className="label-container">
//                         <label>Country</label>
//                         {validationErrors.country && (
//                             <span className="errors">
//                                 {validationErrors.country}
//                             </span>
//                         )}
//                     </div>
//                     <input
//                         type="text"
//                         name="country"
//                         value={country}
//                         onChange={(e) => setCountry(e.target.value)}
//                         placeholder="Country (USA)"
//                     />

//                     <div className="label-container">
//                         <label>Postal Code</label>
//                         {validationErrors.postalCode && (
//                             <span className="errors">
//                                 {validationErrors.postalCode}
//                             </span>
//                         )}
//                     </div>
//                     <input
//                         type="number"
//                         name="postal-code"
//                         value={postalCode}
//                         onChange={(e) => setPostalCode(e.target.value)}
//                         placeholder="Postal Code (5 digits)"
//                     />

//                     <div className="label-container">
//                         <label>Latitude</label>
//                         {validationErrors.lat && (
//                             <span className="errors">
//                                 {validationErrors.lat}
//                             </span>
//                         )}
//                     </div>
//                     <input
//                         type="number"
//                         name="latitude"
//                         value={lat}
//                         onChange={(e) => setLat(e.target.value)}
//                         placeholder="Latitude (-90 to 90)"
//                     />

//                     <div className="label-container">
//                         <label>Longitude</label>
//                         {validationErrors.lng && (
//                             <span className="errors">
//                                 {validationErrors.lng}
//                             </span>
//                         )}
//                     </div>
//                     <input
//                         type="number"
//                         name="longitude"
//                         value={lng}
//                         onChange={(e) => setLng(e.target.value)}
//                         placeholder="Longitude (-180 to 180)"
//                     />

//                     <div className="label-container">
//                         <label>Category</label>
//                         {validationErrors.category && (
//                             <span className="errors">
//                                 {validationErrors.category}
//                             </span>
//                         )}
//                     </div>
//                     <select
//                         name="category"
//                         value={category}
//                         onChange={(e) => setCategory(e.target.value)}
//                     >
//                         <option value="">Select Category</option>
//                         <option value="Restaurant">Restaurant</option>
//                         <option value="Coffee">Coffee</option>
//                         <option value="Gym">Gym</option>
//                         <option value="Salon">Salon</option>
//                     </select>

//                     <div className="label-container">
//                         <label>Phone Number</label>
//                         {validationErrors.phoneNumber && (
//                             <span className="errors">
//                                 {validationErrors.phoneNumber}
//                             </span>
//                         )}
//                     </div>
//                     <input
//                         type="text"
//                         name="phone-number"
//                         value={phoneNumber}
//                         onChange={(e) => setPhoneNumber(e.target.value)}
//                         placeholder="Phone Number (10 digits)"
//                     />

//                     <div className="label-container">
//                         <label>Website</label>
//                         {validationErrors.website && (
//                             <span className="errors">
//                                 {validationErrors.website}
//                             </span>
//                         )}
//                     </div>
//                     <input
//                         type="text"
//                         name="website"
//                         value={website}
//                         onChange={(e) => setWebsite(e.target.value)}
//                         placeholder="Website URL"
//                     />

//                     <div className="label-container">
//                         <label>Description</label>
//                         {validationErrors.description && (
//                             <div className="errors">
//                                 {validationErrors.description}
//                             </div>
//                         )}
//                     </div>
//                     <textarea
//                         name="description"
//                         rows="5"
//                         value={description}
//                         onChange={(e) => setDescription(e.target.value)}
//                         placeholder="Description (Min. 30 characters)"
//                     ></textarea>

//                     <div className="label-container">
//                         <label>Price</label>
//                         {validationErrors.price && (
//                             <div className="errors">
//                                 {validationErrors.price}
//                             </div>
//                         )}
//                     </div>
//                     <select
//                         name="price"
//                         value={price}
//                         onChange={(e) => setPrice(e.target.value)}
//                     >
//                         <option value="">Select Price Level</option>
//                         <option value="1">$</option>
//                         <option value="2">$$</option>
//                         <option value="3">$$$</option>
//                         <option value="4">$$$$</option>
//                     </select>
//                 </section>

//                 <div>
//                     <button type="submit">Update Business</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default UpdateBusinessForm;


import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBusiness } from "../../redux/business.js";
import toTitleCase from "../../utils/toTitleCase.js";

const UpdateBusinessForm = () => {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const business = useSelector((state) => state.businessState[businessId]);
    const sessionUser = useSelector((state) => state.session.user);

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        country: 'USA',
        postal_code: '',
        lat: '',
        lng: '',
        category: '',
        phone_number: '',
        website: '',
        description: '',
        price: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (!sessionUser || !business || sessionUser.id !== business.owner_id) {
            navigate("/");
        }
    }, [business, sessionUser, navigate]);

    useEffect(() => {
        if (business) {
            setFormData({
                name: business.name,
                address: business.address,
                city: business.city,
                state: business.state,
                country: business.country,
                postal_code: business.postal_code,
                lat: business.lat,
                lng: business.lng,
                category: business.category,
                phone_number: business.phone_number,
                website: business.website,
                description: business.description,
                price: business.price,
            });
        }
    }, [business]);



    const handleChange = (e) => {
        const { name, value } = e.target;

        let formattedValue = value;

        // Format and limit values based on the input field
        switch (name) {
            case 'name':
                if (value.length <= 30) {
                    formattedValue = toTitleCase(value);
                }
                break;
            case 'address':
                if (value.length <= 50) {
                    formattedValue = toTitleCase(value);
                }
                break;
            case 'city':
                if (value.length <= 45) {
                    formattedValue = toTitleCase(value);
                }
                break;
            default:
                // Handle other fields as necessary
                break;
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: formattedValue,
        }));
    };


    const validateForm = () => {
        const errors = {};
        const { name, address, city, state, postal_code, lat, lng, description, phone_number, website, price } = formData;

        // Regex for validating business name: allows a-z, A-Z, 0-9, and '
        const nameRegex = /^[a-zA-Z0-9' ]+$/;

        if (!name) errors.name = "Name is required";
        else if (!nameRegex.test(name)) errors.name = "Name can only contain letters (a-z), numbers (0-9), and apostrophes (')";

        if (!address) errors.address = "Address is required";
        if (!city) errors.city = "City is required";
        if (!state) errors.state = "State is required";
        if (description.length < 30) errors.description = "Description needs a minimum of 30 characters";
        if (!postal_code || postal_code.length > 5) errors.postal_code = "Zipcode please enter up to 5 digits only";
        if (!lat || isNaN(lat) || lat < -90 || lat > 90) errors.lat = "Latitude must be between -90 and 90.";
        if (!lng || isNaN(lng) || lng < -180 || lng > 180) errors.lng = "Longitude must be between -180 and 180.";
        if (!phone_number || phone_number.length > 10) errors.phone_number = "Phone number must be exactly 10 digits.";
        if (!website) errors.website = "Please provide a URL to your business.";
        if (!price) errors.price = "Please select a price level";

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const updatedBusiness = {
            ...formData,
            id: businessId,
        };

        const success = await dispatch(updateBusiness(updatedBusiness));

        if (success) {
            navigate(`/businesses/${businessId}`);
        }
    };

    return (
        <div className="create-businesss-page">
            <form onSubmit={handleSubmit} className="create-business-form">
                <h1>Update Business</h1>
                <h2>Please change the details of your business.</h2>
                <h3>Reminder: The more accurate and detailed you are will help future customers!</h3>
                <div className="form-fields">
                    {validationErrors.name && <p className="errors">{validationErrors.name}</p>}
                    {formData.name.length >= 30 && <p>You have reached the max of 30 characters</p>}
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Business Name"
                        maxLength={30}
                    />

                    {validationErrors.address && <p className="errors">{validationErrors.address}</p>}
                    {formData.address.length >= 50 && <p>You have reached the max of 50 characters</p>}
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        maxLength={50}
                    />

                    {validationErrors.city && <p className="errors">{validationErrors.city}</p>}
                    {formData.city.length >= 45 && <p>You have reached the max of 45 characters</p>}
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        maxLength={45}
                    />

                    {validationErrors.state && <p className="errors">{validationErrors.state}</p>}
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        maxLength={2}
                    />

                    {validationErrors.country && <p className="errors">{validationErrors.country}</p>}
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        disabled
                    />

                    {validationErrors.postal_code && <p className="errors">{validationErrors.postal_code}</p>}
                    <input
                        type="number"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleChange}
                        placeholder="Postal Code (5 digits)"

                    />

                    {validationErrors.lat && <p className="errors">{validationErrors.lat}</p>}
                    <input
                        type="number"
                        name="lat"
                        value={formData.lat}
                        onChange={handleChange}
                        placeholder="Latitude (-90 to 90)"
                    />

                    {validationErrors.lng && <p className="errors">{validationErrors.lng}</p>}
                    <input
                        type="number"
                        name="lng"
                        value={formData.lng}
                        onChange={handleChange}
                        placeholder="Longitude (-180 to 180)"
                    />

                    {validationErrors.category && <p className="errors">{validationErrors.category}</p>}
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Coffee">Coffee</option>
                        <option value="Gym">Gym</option>
                        <option value="Salon">Salon</option>
                    </select>

                    {validationErrors.phone_number && <p className="errors">{validationErrors.phone_number}</p>}
                    <input
                        type="number"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="Phone Number (10 digits)"
                    />

                    {validationErrors.website && <p className="errors">{validationErrors.website}</p>}
                    {formData.website.length > 49 && <p>You have reached the max of 50 characters</p>}
                    <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="Website URL"
                        maxLength={50}
                    />

                    {validationErrors.description && <p className="errors">{validationErrors.description}</p>}
                    {formData.description.length > 449 && <p>You have reached the max of 450 characters</p>}
                    <textarea
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description (Min. 30 characters)"
                        maxLength={450}
                    ></textarea>

                    {validationErrors.price && <p className="errors">{validationErrors.price}</p>}
                    <select
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    >
                        <option value="">Select Price Level</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                    </select>

                    <button type="submit">Update Business</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBusinessForm;
