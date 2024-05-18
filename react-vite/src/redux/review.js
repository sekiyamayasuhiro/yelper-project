import { csrfFetch } from './csrf';

const LOAD_REVIEWS = 'review/LOAD_REVIEWS';
const ADD_REVIEW = 'review/ADD_REVIEW';
const REMOVE_REVIEW = 'review/REMOVE_REVIEW';

const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    };
};

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    };
};

const removeReview = (id) => {
    return {
        type: REMOVE_REVIEW,
        id
    };
};

export const getReviewsByBusinessId = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/reviews`);

    if (response.ok) {
        const reviewsData = await response.json();
        dispatch(loadReviews(reviewsData));
    }
}

export const getReviewsByCurrentUser = () => async (dispatch) => {
    const response = await csrfFetch(`api/reviews/current`);

    if (response.ok) {
        const reviewData = await response.json();
        dispatch(loadReviews(reviewData));
    }
};

export const createNewReview = (formData) => async (dispatch) => {
    const response = await csrfFetch(`/api/businesses/${formData.business_id}/reviews`, {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const newReview = response.json();
        dispatch(addReview(newReview));
        return newReview;
    }
}

export const updateReview = (formData) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${formData.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(addReview(updatedReview));
        return updatedReview;
    }
};

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });

    if (response.ok) {
        dispatch(removeReview(reviewId));
    }
}

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = {};
            action.reviews.forEach(review => { newState[review.id] = review });
            return newState;
        }
        case ADD_REVIEW: {
            if (!state[action.review.id]) {
                const newState = {
                    ...state,
                    [action.review.id]: action.review
                };
                return newState;
            }
            return {
                ...state,
                [action.review.id]: {
                    ...state[action.review.id],
                    ...action.review
                }
            };
        }
        case REMOVE_REVIEW: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
};

export default reviewReducer;
