import { csrfFetch } from "./csrf";

const LOAD_IMAGES = "image/LOAD_IMAGES";
const ADD_IMAGE = "image/ADD_IMAGE";
const REMOVE_IMAGE = "image/REMOVE_IMAGE";

const loadImages = (images) => {
    return {
        type: LOAD_IMAGES,
        images,
    };
};

const addImage = (image) => {
    return {
        type: ADD_IMAGE,
        image,
    };
};

const removeImage = (id) => {
    return {
        type: REMOVE_IMAGE,
        id,
    };
};

export const getImagesByBusinessId = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/images`);

    if (response.ok) {
        const imagesData = await response.json();
        dispatch(loadImages(imagesData));
    }
};

export const createImage = (formData) => async (dispatch) => {
    const response = await csrfFetch(
        `/api/businesses/${formData.business_id}/images`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        }
    );

    if (response.ok) {
        const newImage = response.json();
        dispatch(addImage(newImage));
        return newImage;
    }
};

export const uploadImage = (businessId, formData) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}/images/upload`, {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        const newImage = await response.json();
        dispatch(addImage(newImage));
        return newImage;
    }
};


export const deleteImage = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/business-images/${imageId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(removeImage(imageId));
    }
};

export const getUserImages = (userId) => async (dispatch) => {
    const response = await fetch(`/api/users/${userId}/images`);

    if (response.ok) {
        const imagesData = await response.json();
        dispatch(loadImages(imagesData));
        return imagesData
    }
};

const initialState = {};

const imageReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_IMAGES: {
            const newState = {};
            if (action.images) {
                action.images.forEach((image) => {
                    newState[image.id] = image;
                });
            }
            return newState;
        }
        case ADD_IMAGE: {
            if (!state[action.image.id]) {
                const newState = {
                    ...state,
                    [action.image.id]: action.image,
                };
                return newState;
            }
            return {
                ...state,
                [action.image.id]: {
                    ...state[action.image.id],
                    ...action.image,
                },
            };
        }
        case REMOVE_IMAGE: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
};

export default imageReducer;
