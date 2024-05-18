import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessesByCurrentUser } from "../../redux/business.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteBusinessModal from "../DeleteBusinessModal";

const ManageBusinesses = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const businesses = useSelector((state) =>
        Object.values(state.businessState)
            ? Object.values(state.businessState)
            : []
    );

    useEffect(() => {
        dispatch(getBusinessesByCurrentUser());
    }, [dispatch]);

    return (
        <div>
            <div className="manage-businesses-header">
                <h1>Manage Your Businesses</h1>
                <Link to="/businesses/new">
                    <button>Create a New Business</button>
                </Link>
            </div>

            <div className="business-container-manage-businesses">
                {businesses.map(
                    ({
                        id,
                        previewImage,
                        name,
                        city,
                        state,
                        price,
                        avgRating,
                    }) => (
                        <span
                            key={id}
                            className="business-manage-businesses"
                            title={`This is the tooltip: ${name}`}
                        >
                            <Link to={`/businesses/${id}`}>
                                <img src={previewImage} alt={name} />

                                <div className="business-details-manage-businesses">
                                    <span>
                                        {city}, {state}
                                    </span>
                                    <span>
                                        {avgRating ? (
                                            <>
                                                <FaStar />{" "}
                                                {parseInt(avgRating)?.toFixed(
                                                    1
                                                )}
                                            </>
                                        ) : (
                                            "New>"
                                        )}
                                    </span>
                                </div>
                                <span>${parseFloat(price)?.toFixed(2)}</span>
                            </Link>

                            <div>
                                <Link to={`/businesses/${id}/edit`}>
                                    <button>Update</button>
                                </Link>
                                <button>
                                    <OpenModalMenuItem
                                        itemText="Delete"
                                        modalComponent={
                                            <DeleteBusinessModal
                                                businessId={id}
                                            />
                                        }
                                    />
                                </button>
                            </div>
                        </span>
                    )
                )}
            </div>
        </div>
    );
};

export default ManageBusinesses;
