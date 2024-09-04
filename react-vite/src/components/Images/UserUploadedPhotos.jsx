import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserImages } from '../../redux/image';
import { RiDeleteBin6Line } from "react-icons/ri";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteImageModal from '../DeleteImageModal';
import './UserUploadedPhotos.css'


const UserUploadedPhotos = () => {
    const dispatch = useDispatch();
    const userId  = useSelector((state) => state.session.user?.id)
    const images = useSelector((state) => Object.values(state.imageState));

    useEffect(() => {
        dispatch(getUserImages(userId));
    }, [dispatch, userId]);

    return (
        <div className="user-uploaded-photos">
            <h2>Photos</h2>
            <div className="photos-container">
                {images.length > 0 ? (
                    images.map((image) => (
                        <div key={image.id} className="photo-item">
                            <OpenModalMenuItem
                                itemText={<RiDeleteBin6Line className="delete-icon" />}
                                modalComponent={<DeleteImageModal imageId={image.id} />}
                            />
                            <img src={image.url} alt={`Uploaded by user ${userId}`} />
                            {image.business_name && (
                                <div className="photo-business-name">
                                    {image.business_name}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No photos available.</p>
                )}
            </div>
        </div>
    );
};

export default UserUploadedPhotos
