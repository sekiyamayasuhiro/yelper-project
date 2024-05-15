import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="navigation">
      <Link to="/"><img id="app-logo" alt="Little Z Logo" /></Link>

      <div>
        {isLoaded && sessionUser && <Link to="/businesses/new" className="create-business-link">Create a New Business</Link>}
        {isLoaded && <ProfileButton className="profile-button" user={sessionUser} />}
      </div>

    </div>
  );
}

export default Navigation;
