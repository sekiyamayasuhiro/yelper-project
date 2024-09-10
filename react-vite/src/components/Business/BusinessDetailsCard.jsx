import { FaExternalLinkAlt, FaPhoneAlt, FaEdit } from 'react-icons/fa';
import { MdDirections } from "react-icons/md";
import './BusinessDetailsCard.css'

const BusinessDetailsCard = ({ business }) => {
    const { website, phone_number, address, city, state, postal_code } = business

    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = phoneNumber.toString().replace(/\D/g, ''); // Ensure only numbers
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    };

    return (
        <div className="businessdetails-card-container">
            <div className="business-info-section">
                <div className="business-info-item top">
                <a href={`https://${website}`} target="_blank" rel="noreferrer">{website}</a> <a href={`https://${website}`} target="_blank" rel="noreferrer"><FaExternalLinkAlt className='icon'/></a>
                </div>
                <div className="business-info-item">
                     <p>{formatPhoneNumber(phone_number)}</p> <FaPhoneAlt className="icon" />
                </div>
                <div className="business-info-item">
                     <div>
                        <p className='get-direction' onClick={() => alert('Feature coming soon')}>Get Direction</p>
                        <p className='business-details-card-address'>
                        {address} <br />
                        {`${city}, ${state}`} <br />
                            {postal_code}
                            </p>
                     </div>
                     <MdDirections style={{ fontSize: '26px' }} />
                </div>
                <button className="edit-button" onClick={() => alert('Feature coming soon')}>
                    <FaEdit className="icon" />
                    Suggest an edit
                </button>
            </div>
        </div>
    );
};

export default BusinessDetailsCard;
