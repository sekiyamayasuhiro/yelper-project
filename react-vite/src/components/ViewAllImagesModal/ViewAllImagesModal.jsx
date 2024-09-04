import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import { getImagesByBusinessId } from "../../redux/image.js";
// import DeleteImageModal from "../DeleteImageModal";
import { useModal } from "../../context/Modal.jsx";
import "./ViewAllImagesModal.css";

const ViewAllImagesModal = ({ businessId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const images = useSelector((state) =>
        Object.values(state.imageState || {})
    );

    const sessionUser = useSelector((state) => state.session.user);
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
            {isLoaded &&
                images.map(({ id, url, user_id }) => {
                    const isImagePoster =
                        sessionUser && user_id && sessionUser.id === user_id;

                    return (
                        <div key={id} className="view-all-images-item">
                            <img src={url} alt={`Picture with id:${id}`} />
                            {/* {isImagePoster && (
                                <button>
                                    <OpenModalMenuItem
                                        itemText="Delete"
                                        modalComponent={
                                            <DeleteImageModal imageId={id} />
                                        }
                                    />
                                </button>
                            )} */}
                        </div>
                    );
                })}
            </div>

            {/* <button onClick={closeModal}>Close Modal</button> */}
            </div>
        </div>
    );
};

export default ViewAllImagesModal;
