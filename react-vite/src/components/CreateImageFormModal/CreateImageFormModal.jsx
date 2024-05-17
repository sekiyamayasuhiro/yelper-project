import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createImage } from "../../redux/image.js";

const CreateImageFormModal = ({ businessId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [imageUrl1, setImageUrl1] = useState("");
    // const [imageUrl2, setImageUrl2] = useState('');
    // const [imageUrl3, setImageUrl3] = useState('');
    // const [imageUrl4, setImageUrl4] = useState('');

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const resetForm = () => {
            setValidationErrors({});
            setImageUrl1("");
            // setImageUrl2('');
            // setImageUrl3('');
            // setImageUrl4('');
        };

        return () => {
            resetForm();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        // Check if any of the image URLs do not end with .png, .jpg, or .jpeg
        const imageUrls = [imageUrl1];
        // const imageUrls = [imageUrl1, imageUrl2, imageUrl3, imageUrl4];
        const imageUrlRegex = /^$|.*\.(png|jpg|jpeg)$/;
        imageUrls.forEach((url, index) => {
            if (url.length && !imageUrlRegex.test(url)) {
                errors[`imageUrl${index + 1}`] =
                    "Image URL must end in .png, .jpg, or .jpeg";
            }
        });

        if (Object.values(errors).length) {
            setValidationErrors(errors);
            return;
        }

        if (imageUrl1.length) {
            await dispatch(
                createImage({
                    business_id: businessId,
                    url: imageUrl1,
                    preview: false,
                })
            );
        }
        // if (imageUrl2.length) { await dispatch(createImage({ business_id: businessId, url: imageUrl2, preview: false })); }
        // if (imageUrl3.length) { await dispatch(createImage({ business_id: businessId, url: imageUrl3, preview: false })); }
        // if (imageUrl4.length) { await dispatch(createImage({ business_id: businessId, url: imageUrl4, preview: false })); }

        closeModal();
    };

    return (
        <div className="create-image-form-modal">
            <form onSubmit={handleSubmit}>
                <section>
                    <h2>Add more photos for the business</h2>

                    <input
                        type="text"
                        name="image-url-1"
                        value={imageUrl1}
                        onChange={(e) => setImageUrl1(e.target.value)}
                        placeholder="Image URL"
                    />
                    {validationErrors.imageUrl1 && (
                        <div className="errors">
                            {validationErrors.imageUrl1}
                        </div>
                    )}

                    {/* <input
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
                    {validationErrors.imageUrl4 && <div className="errors">{validationErrors.imageUrl4}</div>} */}
                </section>

                <button type="submit">Add Your Image</button>
            </form>
        </div>
    );
};

export default CreateImageFormModal;
