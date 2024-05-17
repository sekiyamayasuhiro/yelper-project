import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";
import SearchBar from "../SearchBar/SearchBar";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks

  if (sessionUser) {
    sessionLinks = (
      <li><ProfileButton user={sessionUser}/></li>
    )
  } else {
    sessionLinks = (
      <div className="login-signup">
      <div className="login"><OpenModalButton buttonText='Log In' modalComponent={<LoginFormModal />} /></div>
      <div className="signup"><OpenModalButton buttonText='Sign Up' modalComponent={<SignupFormModal />} /></div>
      </div>

    )
  }

  return (

    <div className="navbar">
      <div className="header">
        <Link to="/"><img id="app-logo" alt="Little Z Logo" src='logo.jpg' /></Link>
        <SearchBar />
        {sessionUser && (
          <div className="session-user">
            <div><Link to='businesses/new'>Create Business</Link></div>
            <div><Link>Write a Review</Link></div>
          </div>
        )}
        <div>
          {sessionLinks}
        </div>
      </div>

      {/* <div>
        {isLoaded && sessionUser && <Link to="/businesses/new" className="create-business-link">Create a New Business</Link>}
        {isLoaded && <ProfileButton className="profile-button" user={sessionUser} />}
      </div> */}
      {/* <div>{sessionUser ? <ProfileButton /> : <}</div> */}
    </div>

  );
}

export default Navigation;
