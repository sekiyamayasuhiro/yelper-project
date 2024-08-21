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

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <div>
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

                <div className="session-links">
                    <div className="yelp-business">
                        <div>
                            <Link to="/businesses/new">
                                Yelp for Business <span className="arrow"><IoIosArrowDown /></span>
                            </Link>
                        </div>
                        <div className="dropdown">
                            <Link to="/businesses/new">Add a Business</Link>
                        </div>
                    </div>
                    <div>
                        <Link to="/review" className="write-review">Write a Review</Link>
                    </div>
                    {sessionLinks}
                </div>
            </div>
            {isHomePage && <CyclingImages />}
        </div>
    );
}

export default Navigation;
