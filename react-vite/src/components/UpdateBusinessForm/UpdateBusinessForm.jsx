import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateBusiness } from '../../redux/business.js';


const UpdateBusinessForm = () => {

    const { businessId } = useParams();
    const business = useSelector(state => state.businessState[businessId] ? state.businessState[businessId] : []);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);

    const [country, setCountry] = useState(business.country);
    const [address, setAddress] = useState(business.address);
    const [city, setCity] = useState(business.city);
    const [state, setState] = useState(business.state);
    const [description, setDescription] = useState(business.description);
    const [name, setName] = useState(business.name);
    const [price, setPrice] = useState((business.price));

    const [validationErrors, setValidationErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!country) {
            errors.country = 'Country is required';
        }
        if (!address) {
            errors.address = 'Address is required';
        }
        if (!city) {
            errors.city = 'City is required';
        }
        if (!state) {
            errors.state = 'State is required';
        }
        if (description.length < 30) {
            errors.description = 'Description needs a minimum of 30 characters';
        }
        if (!name) {
            errors.name = 'Name is required';
        }
        if (!price) {
            errors.price = 'Price is required';
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
            postalCode,
            lat,
            lng,
            category,
            phoneNumber,
            website,
            description,
            price
        };

        const updatedBusiness = await dispatch(updateBusiness(updateBusinessData));

        if (updatedBusiness) {
            navigate(`/businesses/${updatedBusiness.id}`);
        } else {
            navigate(`/businesses/${businessId}`);
        }

    };

    return (
        <div className="update-businesss-page">
            <form className="update-business-form" onSubmit={handleSubmit}>
                <h1>Update Your Business</h1>
                <section>
                    <h2>Where&apos;s your business located?</h2>

                    <div className="label-container">
                        <label>Address</label>
                        {validationErrors.address && <span className="errors">{validationErrors.address}</span>}
                    </div>

                    <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Address" />

                    <div className="label-container">
                        <label>City</label>
                        {validationErrors.city && <span className="errors">{validationErrors.city}</span>}
                    </div>

                    <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        placeholder="City" />

                    <div className="label-container">
                        <label>State</label>
                        {validationErrors.state && <span className="errors">{validationErrors.state}</span>}
                    </div>

                    <input
                        type="text"
                        name="state"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder="STATE" />

                    <div className="label-container">
                        <label>Country</label>
                        {validationErrors.country && <span className="errors">{validationErrors.country}</span>}
                    </div>

                    <input
                        type="text"
                        name="country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder="country" />


                </section>

                <section>
                    <h2>Describe your business</h2>

                    <textarea
                        name="description"
                        rows="5"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Description">
                    </textarea>
                    {validationErrors.description && <div className="errors">{validationErrors.description}</div>}
                </section>

                <section>
                    <h2>Create a title for your business</h2>
                    <p>Catch guests&apos; attention with a business title that highlights what makes your business special.</p>
                    <input
                        type="text"
                        name="business-name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Name of your business" />
                    {validationErrors.name && <div className="errors">{validationErrors.name}</div>}
                </section>

                <section>
                    <h2>Set a base price for your business</h2>

                    <span>$  </span>
                    <input
                        type="number"
                        name="price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        placeholder="Price" />
                    {validationErrors.price && <div className="errors">{validationErrors.price}</div>}
                </section>

                <button type="submit">Update Your Business</button>

            </form>

        </div >
    );
}

export default UpdateBusinessForm;
