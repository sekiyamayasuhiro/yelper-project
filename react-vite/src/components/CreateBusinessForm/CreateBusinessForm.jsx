import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewBusiness } from '../../redux/business.js';
import { createImage } from '../../redux/image.js';


const CreateBusinessForm = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [category, setCategory] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const [previewImage, setPreviewImage] = useState('');
    const [imageUrl1, setImageUrl1] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');
    const [imageUrl4, setImageUrl4] = useState('');

    const [validationErrors, setValidationErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        const resetForm = () => {
            setValidationErrors({});
            setCountry('');
            setAddress('');
            setCity('');
            setState('');
            setDescription('');
            setName('');
            setPrice('');
            setPreviewImage('');
            setImageUrl1('');
            setImageUrl2('');
            setImageUrl3('');
            setImageUrl4('');
        };

        return (() => { resetForm() });
    }, []);

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
        if (description < 30) {
            errors.description = 'Description needs a minimum of 30 characters';
        }
        if (!name) {
            errors.name = 'Name is required';
        }
        if (!price || price.startsWith('-')) {
            errors.price = 'Price is required';
        }

        if (!previewImage) {
            errors.previewImage = 'Preview Image is required';
        } else {
            const previewImageRegex = /^.*\.(png|jpg|jpeg)$/;
            if (!previewImageRegex.test(previewImage)) {
                errors.previewImage = 'Preview Image URL must end in .png, .jpg, or .jpeg';
            }
        }

        const imageUrls = [imageUrl1, imageUrl2, imageUrl3, imageUrl4];
        const imageUrlRegex = /^$|.*\.(png|jpg|jpeg)$/;
        imageUrls.forEach((url, index) => {
            if (url.length && !imageUrlRegex.test(url)) {
                errors[`imageUrl${index + 1}`] = 'Image URL must end in .png, .jpg, or .jpeg';
            }
        });

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
            postalCode,
            lat,
            lng,
            category,
            phoneNumber,
            website,
            description,
            price
        };

        const newBusiness = await dispatch(createNewBusiness(newBusinessFormData));

        await dispatch(createImage(newBusiness.id, { url: previewImage, preview: true }));

        if (imageUrl1.length) { await dispatch(createImage(newBusiness.id, { url: imageUrl1, preview: false })); }
        if (imageUrl2.length) { await dispatch(createImage(newBusiness.id, { url: imageUrl2, preview: false })); }
        if (imageUrl3.length) { await dispatch(createImage(newBusiness.id, { url: imageUrl3, preview: false })); }
        if (imageUrl4.length) { await dispatch(createImage(newBusiness.id, { url: imageUrl4, preview: false })); }

        if (newBusiness) {
            navigate(`/businesses/${newBusiness.id}`);
        }

    };

    return (
        <div className="create-businesss-page">
            <form className="create-business-form" onSubmit={handleSubmit}>
                <h1>Create a New Business</h1>

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

                    <div className="label-container">
                        <label>Postal Code</label>
                        {validationErrors.postalCode && <span className="errors">{validationErrors.postalCode}</span>}
                    </div>

                    <input
                        type="number"
                        name="postal-code"
                        value={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                        placeholder="Postal Code" />

                    <div className="label-container">
                        <label>Lat</label>
                        {validationErrors.lat && <span className="errors">{validationErrors.lat}</span>}
                    </div>

                    <input
                        type="number"
                        name="lat"
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                        placeholder="Latitude" />

                    <div className="label-container">
                        <label>Lng</label>
                        {validationErrors.lng && <span className="errors">{validationErrors.lng}</span>}
                    </div>

                    <input
                        type="number"
                        name="lng"
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                        placeholder="Longitude" />

                    <div className="label-container">
                        <label>Category</label>
                        {validationErrors.category && <span className="errors">{validationErrors.category}</span>}
                    </div>

                    <input
                        type="text"
                        name="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        placeholder="Category" />

                    <div className="label-container">
                        <label>Phone Number</label>
                        {validationErrors.phoneNumber && <span className="errors">{validationErrors.phoneNumber}</span>}
                    </div>

                    <input
                        type="text"
                        name="phone-number"
                        value={phoneNumber}
                        onChange={e => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number" />

                    <div className="label-container">
                        <label>Website</label>
                        {validationErrors.website && <span className="errors">{validationErrors.website}</span>}
                    </div>

                    <input
                        type="text"
                        name="website"
                        value={website}
                        onChange={e => setWebsite(e.target.value)}
                        placeholder="Website" />

                    <div className="label-container">
                        <label>Description</label>
                        {validationErrors.description && <div className="errors">{validationErrors.description}</div>}
                    </div>

                    <textarea
                        name="description"
                        rows="5"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Description">
                    </textarea>

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

                <section>
                    <h2>Liven up your business with photos</h2>
                    <p>Submit a link to at least one photo to publish your business.</p>
                    <input
                        type="text"
                        name="preview-image"
                        value={previewImage}
                        onChange={e => setPreviewImage(e.target.value)}
                        placeholder="Preview Image URL" />
                    {validationErrors.previewImage && <div className="errors">{validationErrors.previewImage}</div>}

                    <input
                        type="text"
                        name="image-url-1"
                        value={imageUrl1}
                        onChange={e => setImageUrl1(e.target.value)}
                        placeholder="Image URL" />
                    {validationErrors.imageUrl1 && <div className="errors">{validationErrors.imageUrl1}</div>}

                    <input
                        type="text"
                        name="image-url-2"
                        value={imageUrl2}
                        onChange={e => setImageUrl2(e.target.value)}
                        placeholder="Image URL" />
                    {validationErrors.imageUrl2 && <div className="errors">{validationErrors.imageUrl2}</div>}

                    <input
                        type="text"
                        name="image-url-3"
                        value={imageUrl3}
                        onChange={e => setImageUrl3(e.target.value)}
                        placeholder="Image URL" />
                    {validationErrors.imageUrl3 && <div className="errors">{validationErrors.imageUrl3}</div>}

                    <input
                        type="text"
                        name="image-url-4"
                        value={imageUrl4}
                        onChange={e => setImageUrl4(e.target.value)}
                        placeholder="Image URL" />
                    {validationErrors.imageUrl4 && <div className="errors">{validationErrors.imageUrl4}</div>}
                </section>

                <button type="submit">Create Business</button>

            </form>

        </div>
    );
};

export default CreateBusinessForm;
