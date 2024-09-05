import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react";

export default function ReviewShare() {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const { reviewPosted } = location.state || {};

        if (!reviewPosted) {
            navigate('/');
        }
    }, [location.state, navigate]);

    if (!location.state?.reviewPosted) {
        return null;
    }


    return (
        <div>
            <h2>Your review is now live! 🎉</h2>
            <h3>Thank you for sharing your thoughts.</h3>
        </div>
    )
}
