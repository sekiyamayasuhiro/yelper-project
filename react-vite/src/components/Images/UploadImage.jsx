import { useModal } from "../../context/Modal.jsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../redux/image.js";

const UploadImage = ({ businessId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [image, setImage] = useState(null); // State to hold the selected file
    const [imageLoading, setImageLoading] = useState(false);
    // const [validationError, setValidationError] = useState("");


    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true)

        await dispatch(uploadImage(businessId, formData))
            setImageLoading(false)
            closeModal();
    };


    return (
        <div className="create-image-form-modal">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <section>
                    <h2>Add more photos for the business</h2>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {/* {validationError && (
                        <div className="errors">{validationError}</div>
                    )} */}
                </section>
                <button type="submit" disabled={!image}>Add Your Image</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </div>
    );
};

export default UploadImage;
