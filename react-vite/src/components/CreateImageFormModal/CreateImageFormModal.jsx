import { useModal } from "../../context/Modal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createImage } from "../../redux/image.js";

const CreateImageFormModal = ({ businessId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [imageUrl1, setImageUrl1] = useState("");

    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const resetForm = () => {
            setValidationErrors({});
            setImageUrl1("");
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

        closeModal();
    };

    return (
        <div className="create-image-form-modal">
            <form onSubmit={handleSubmit}>
                <section>
                    <h2>Add more photos for the business</h2>
                    <h3>
                        Dear users: We apologize for the inconvenience, soon we
                        will be implementing a feature to upload picture files!
                        - Yelper Team
                    </h3>
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
                </section>

                <button type="submit" disabled={!imageUrl1}>
                    Add Your Image
                </button>
            </form>
        </div>
    );
};

export default CreateImageFormModal;
