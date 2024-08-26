import { GrEdit } from "react-icons/gr";
import { BsPersonAdd } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';

function ProfileCard () {
  const user = useSelector(state => state.session?.user)

  return (
    <div className="profile-card">
      <div>
        <FaUserCircle className="profile-header-icon" />
        <h2>{user?.username}</h2>
        <p>Location, HERE</p>
      </div>
      <div className="profile-actions">
        <div className="profile-action-item">
          <GrEdit
            className="profile-card-icon"
            onClick={() => alert('Feature coming soon')}
          />
          <p>Profile</p>
        </div>
        <div className="profile-action-item">
          <FaUserCircle
            className="profile-card-icon"
            onClick={() => alert('Feature coming soon')}
          />
          <p>Add Photo</p>
        </div>
        <div className="profile-action-item">
          <BsPersonAdd
            className="profile-card-icon"
            onClick={() => alert('Feature coming soon')}
          />
          <p>Add Friends</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard
