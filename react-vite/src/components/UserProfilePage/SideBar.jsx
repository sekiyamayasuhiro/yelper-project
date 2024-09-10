// Sidebar Component
import { MdReviews } from "react-icons/md";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { MdEventAvailable } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function SideBar () {
  const navigate = useNavigate()

  const handleReviewsClick = () => {
    navigate('/user_details_reviews_self')
  }

  const handleProfileClick = () => {
    navigate('/user_details')
  }


  const handlePhotosClick = () => {
    navigate('/user_local_photos')
  }

  return (
    <div className="sidebar">
        <div className='sidebar-item' onClick={handleProfileClick}><span><FaUserCircle className='sidebar-icon'/></span><p>Profile Overview</p></div>
        <div className="with-divider"></div>
        <div className='sidebar-item' onClick={handleReviewsClick}><span><MdReviews className='sidebar-icon'/></span><p >Reviews</p></div>
        <div className='sidebar-item' onClick={handlePhotosClick}><span><TbPhotoSquareRounded className='sidebar-icon'/></span><p>Photos and videos</p></div>
        <div className="with-divider"></div>
        <div className='sidebar-item' onClick={() => alert('Feature coming soon')}><span><FaUserFriends className='sidebar-icon'/></span><p>Friends</p></div>
        <div className='sidebar-item' onClick={() => alert('Feature coming soon')}><span><MdEventAvailable className='sidebar-icon'/></span><p>Events</p></div>



    </div>
  )
}


export default SideBar
