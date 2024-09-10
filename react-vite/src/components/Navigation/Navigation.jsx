import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SearchBar from "../SearchBar/SearchBar";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { getAllBusinesses } from "../../redux/business";
import { IoIosArrowDown } from "react-icons/io";
import CyclingImages from "../CyclingImages/CyclingImages";
import { FaYelp } from "react-icons/fa";
import { MdOutlineAddBusiness } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import "./Navigation.css";

function Navigation() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const sessionUser = useSelector((state) => state.session.user);

    const handleClick = () => {
        dispatch(getAllBusinesses());
        navigate("/");
    };

    const handleAddBusinessClick = (e) => {
        if (!sessionUser) {
            e.preventDefault();
            alert("You need to log in to create a business.");
        }
    };

    const handleWriteReviewClick = (e) => {
        if (!sessionUser) {
            e.preventDefault();
            alert("You need to log in to write a review.");
        }
    };

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <div className="profile-button">
                <ProfileButton user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <div className="login-signup">
                <div className="login">
                    <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                    />
                </div>
                <div className="signup">
                    <OpenModalButton
                        buttonText="Sign Up"
                        modalComponent={<SignupFormModal />}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={isHomePage ? 'navbar home-page' : 'navbar other-page'}>
            <div className="navbar-content">
                <h2 id="app-logo" onClick={handleClick}>
                    yelper <FaYelp className="logo-icon" />
                </h2>
                <div className="search-container">
                    <SearchBar />
                </div>

                <div className={sessionUser ? "session-links loggedin" : "session-links"}>
                    <div className="yelp-business">
                        <div>
                            <span className="yelp-for-business">
                                Yelp for Business <span className="arrow"><IoIosArrowDown /></span>
                            </span>
                    </div>
                        <div className="dropdown">
                            <Link to="/businesses/new" onClick={handleAddBusinessClick}>
                                <MdOutlineAddBusiness />
                                Add a Business
                            </Link>
                            {sessionUser && (
                                <Link to="/businesses/manage" >
                                    <FaGear />
                                    Manage your business
                                </Link>
                            )}
                        </div>
                </div>
                    <div>
                        <Link to="/writeareview" className="write-review" onClick={handleWriteReviewClick}>Write a Review</Link>
                    </div>
                    {sessionLinks}
                </div>
            </div>
            {isHomePage && <CyclingImages />}
        </div>
    );
}

export default Navigation;
