import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImagesByBusinessId } from "../../redux/image.js";
import { useModal } from "../../context/Modal.jsx";
import "./ViewAllImagesModal.css";

const ViewAllImagesModal = ({ businessId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const images = useSelector((state) =>
        Object.values(state.imageState || {})
    );

    const businessState  = useSelector((state) => state.businessState)
    const business = businessState[businessId]

    useEffect(() => {
        dispatch(getImagesByBusinessId(businessId)).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch, businessId]);

    return (
        <div className="view-all-images-modal">
            <div className="view-all-images-modal-content">
                <h2>Photos for {business?.name}</h2>
                <span className="view-all-images-close" onClick={closeModal}>&times;</span>
                <div className="view-all-images-container">
                    {isLoaded && images.map(({ id, url }) => {
                        return (
                            <div key={id} className="view-all-images-item">
                                <img src={url} alt={`Picture with id:${id}`} />
                            </div>);
                    })}
                </div>
            </div>
        </div>
    );
};

export default ViewAllImagesModal;
