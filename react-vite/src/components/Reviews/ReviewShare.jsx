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
            <p>Thank you for sharing your thoughts. In the meantime, spread the word and share your review with others!</p>
        </div>
    )
}
