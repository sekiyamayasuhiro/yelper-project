import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../redux/image";

const UploadImage = () => {
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Set the file to state
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert("Please select a file before submitting.");
            return;
        }

        // Dispatch the Redux action to upload the image
        dispatch(uploadImage(businessId, file))
            .then((newImage) => {
                alert("Image uploaded successfully!");
                // Optionally navigate back to the business details page or to another relevant page
                navigate(`/businesses/${businessId}`);
            })
            .catch((error) => {
                alert(`Upload failed: ${error.message}`);
            });
    };

    return (
        <div>
            <h1>Upload Image for Business</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <button type="submit">Upload Image</button>
            </form>
        </div>
    );
};

export default UploadImage;
