import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessesByCurrentUser } from "../../redux/business.js";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteBusinessModal from "../DeleteBusinessModal";
import BusinessCard from "../BusinessCard/BusinessCard.jsx";
import { useState } from "react";
import '../ManageReviews/ManageReviews.css'
import "./ManageBusinesses.css";

const ManageBusinesses = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const sessionUser = useSelector((state) => state.session.user);
    const businesses = useSelector((state) =>
        Object.values(state.businessState)
            ? Object.values(state.businessState)
            : []
    );

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    // const reviews = useSelector((state) =>
    //     Object.values(state?.reviewState)
    //         ? Object.values(state?.reviewState)
    //         : []
    // );

    useEffect(() => {
        dispatch(getBusinessesByCurrentUser());

        //ADD REVIEW DISPATCH
    }, [dispatch]);

    // const defaultimage =
    //     "https://pbs.twimg.com/media/FgfRWcSVsAEi6y2?format=jpg&name=small";



    return (
        // <div>
        //     <div className="manage-businesses-header">
        //         <h1>Manage Your Businesses</h1>
        //         <Link to="/businesses/new">
        //             <button>Create a New Business</button>
        //         </Link>
        //     </div>

        //     <div className="business-container-manage-businesses">
        //         {businesses.map(
        //             ({
        //                 id,
        //                 BusinessImages,
        //                 name,
        //                 city,
        //                 state,
        //                 price,
        //                 category,
        //                 avgRating,
        //             }) => {
        //                 const imageUrl =
        //                     BusinessImages && BusinessImages.length > 0
        //                         ? BusinessImages[0].url
        //                         : defaultimage;

        //                 return (
        //                     <span
        //                         key={id}
        //                         className="business-manage-businesses"
        //                         title={`This is the tooltip: ${name}`}
        //                     >
        //                         <Link to={`/businesses/${id}`}>
        //                             <img src={imageUrl} alt={name} />

        //                             <div className="business-details-manage-businesses">
        //                                 <div> {name} </div>
        //                                 <div>
        //                                     {city}, {state}
        //                                 </div>
        //                                 <span>
        //                                     {avgRating ? (
        //                                         <>
        //                                             <FaStar />{" "}
        //                                             {avgRating.toFixed(2)}
        //                                         </>
        //                                     ) : (
        //                                         <>
        //                                             <FaStar />
        //                                             {"0.00"}
        //                                         </>
        //                                     )}
        //                                 </span>
        //                                 {/* <span>
        //                                     {" "}
        //                                     {`(${reviews.length} ${
        //                                         reviews.length !== 0 &&
        //                                         reviews.length === 1
        //                                             ? "Review"
        //                                             : reviews.length > 1
        //                                             ? "Reviews"
        //                                             : "No Reviews"
        //                                     })`}
        //                                 </span> */}
        //                             </div>
        //                             {/* <span>{priceSigns}</span> */}
        //                             <div className="price-category">{`${"$".repeat(
        //                                 price
        //                             )} - ${category}`}</div>
        //                         </Link>

        //                         <div>
        //                             <Link to={`/businesses/${id}/edit`}>
        //                                 <button>Update</button>
        //                             </Link>
        //                             <button>
        //                                 <OpenModalMenuItem
        //                                     itemText="Delete"
        //                                     modalComponent={
        //                                         <DeleteBusinessModal
        //                                             businessId={id}
        //                                         />
        //                                     }
        //                                 />
        //                             </button>
        //                         </div>
        //                     </span>
        //                 );
        //             }
        //         )}
        //     </div>
        // </div>
        <div className="manage-business-container">
                            <Link to="/businesses/new">
                    <button className="manage-business-create-business">Create a New Business</button>
                </Link>
            <div className="manage-businesses-header">

                <h1>Manage Your Businesses</h1>

            </div>
            <div className="business-list">
                {businesses.map((business) => (
                    <div className="manage-business-item" key={business.id}>



                    <div ><BusinessCard key={business.id} business={business}/></div>

<div className="review-footer">
                        <div className="menu-container">
                            <button className="menu-button" onClick={toggleMenu}>...</button>
                            {menuOpen && (
                                <div className="menu-dropdown">
                                    <button onClick={() => navigate(`/businesses/${business.id}/edit`)}>
                                     Update Business
                                    </button>
                                    <button>
                                        <OpenModalMenuItem
                                            itemText="Delete Business"
                                            modalComponent={<DeleteBusinessModal businessId={business.id} />}
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    </div>


                ))}

            </div>


            {/* <div className="business-container-manage-businesses">
                {businesses.map(
                    ({
                        id,
                        images,
                        name,
                        city,
                        state,
                        price,
                        category,
                        avgRating,
                    }) => {
                        const imageUrl =
                        images && images.length > 0
                                ? images[0].url
                                : defaultimage;

                        return (
                            <div
                                key={id}
                                className="business-manage-businesses"
                                title={`This is the tooltip: ${name}`}
                            >
                                <img src={imageUrl} alt={name} />
                                <Link
                                    to={`/businesses/${id}`}
                                    className="business-details-manage-businesses"
                                >
                                    <h2>{name}</h2>
                                    <div>
                                        {city}, {state}
                                    </div>
                                    <div>
                                        <FaStar />{" "}
                                        {avgRating
                                            ? avgRating.toFixed(2)
                                            : "0.00"}
                                    </div>
                                    <div className="price-category">{`${"$".repeat(
                                        price
                                    )} - ${category}`}</div>
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
                            </div>

                        );
                    }
                )}
            </div> */}
        </div>
    );
};

export default ManageBusinesses;
