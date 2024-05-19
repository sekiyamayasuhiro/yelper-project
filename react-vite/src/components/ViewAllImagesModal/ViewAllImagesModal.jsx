import { useModal } from "../../context/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";
import { getImagesByBusinessId } from "../../redux/image.js";
import DeleteImageModal from "../DeleteImageModal";

const ViewAllImagesModal = ({ businessId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const images = useSelector((state) =>
        Object.values(state.imageState || {})
    );

    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getImagesByBusinessId(businessId)).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch, businessId]);

    return (
        <div>
            {isLoaded &&
                images.map(({ id, url, user_id }) => {
                    const isImagePoster =
                        sessionUser && user_id && sessionUser.id === user_id;

                    return (
                        <div key={id}>
                            <img src={url} alt={`Picture with id:${id}`} />
                            {isImagePoster && (
                                <button>
                                    <OpenModalMenuItem
                                        itemText="Delete"
                                        modalComponent={
                                            <DeleteImageModal imageId={id} />
                                        }
                                    />
                                </button>
                            )}
                        </div>
                    );
                })}

            {/* <button onClick={closeModal}>Close Modal</button> */}
        </div>
    );
};

export default ViewAllImagesModal;
