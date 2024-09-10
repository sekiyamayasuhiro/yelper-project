import ProfileCard from './ProfileCard';
import SideBar from './SideBar';
import ManageReviews from '../ManageReviews';
import Impact from './Impact';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UserProfilePage.css'

const UserProfilePage = () => {
  const location = useLocation()
  const reviewsPage = location.pathname === '/user_details_reviews_self'
  const user = useSelector(state => state.session?.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, navigate])

  if (!user) return 'Loading...'

  return (
    <div className="user-profile-page">
      <div>
        <ProfileCard />
        <SideBar />
      </div>
      <div className='userprofilepage-main-content'>
        {reviewsPage ? <ManageReviews /> :
        <>
          <Impact />
          <div className="more-about-me">
            <h3>More about me</h3>
            <div className="info">
              <p><strong>Yelping since: </strong>{user?.created_at}</p>
            </div>
          </div>
        </>}
      </div>
    </div>
  );
};

export default UserProfilePage;
