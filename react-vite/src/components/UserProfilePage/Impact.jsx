import { BsPersonUp } from "react-icons/bs";
import { FaAward } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import './UserProfilePage.css'

function Impact() {
  const user = useSelector(state => state.session.user);
  const reviews = user?.reviews ? Object.values(user.reviews) : [];

  return (
    <div className="impact">
      <h3>Impact</h3>
      <div className="impact-stats">
        <div className="stat">
          <h4>Views last 90 days</h4>
          <AiFillStar className="impact-icon" />
          <p>Reviews</p>
          <strong>{reviews.length}</strong>
        </div>
        <div className="impact-divider"></div>
        <div>
          <h4>Stats</h4>
          <div className="stats">
            <div className="impact-item">
              <GrEdit className="impact-icon" />
              <p>Review updates</p>
              <strong>0</strong>
            </div>
            <div className="impact-item">
              <FaAward className="impact-icon" />
              <p>First reviews</p>
              <strong>0</strong>
            </div>
            <div className="impact-item">
              <BsPersonUp className="impact-icon" />
              <p>Followers</p>
              <strong>0</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Impact;
