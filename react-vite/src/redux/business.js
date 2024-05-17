import { csrfFetch } from './csrf';


const LOAD_BUSINESSES = 'business/LOAD_BUSINESSES';
const ADD_BUSINESS = 'business/ADD_BUSINESS';
const REMOVE_BUSINESS = 'business/REMOVE_BUSINESS';
const NO_RESULT = '/business/NO_RESULT'

const loadBusinesses = (businesses) => {
    return {
        type: LOAD_BUSINESSES,
        businesses
    }
}

const addBusiness = (business) => {
    return {
        type: ADD_BUSINESS,
        business
    }
}

const removeBusiness = (id) => {
    return {
        type: REMOVE_BUSINESS,
        id
    }
}

export const getAllBusinesses = (searchParams) => async (dispatch) => {
    const queryParams = new URLSearchParams(searchParams).toString()
    const response = await fetch(`/api/businesses/search?${queryParams}`)
    if (response.ok) {
        const data = await response.json()
        dispatch(loadBusinesses(data))
    }
}

export const queryBusinesses = (searchTerms) => async (dispatch) => {
    let url = "/api/businesses?";
    if (searchTerms.name) url += `name=${searchTerms.name}`;
    if (searchTerms.category) url += `&category=${searchTerms.category}`;
    if (searchTerms.price) url += `&price=${searchTerms.price}`;

    const response = await fetch(url);

    if (response.ok) {
        const businessesData = await response.json();
        dispatch(loadBusinesses(businessesData.Businesses));
    }
};

export const getBusinessDetailsById = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${businessId}`);

    if (response.ok) {
        const businessData = await response.json();
        dispatch(addBusiness(businessData));
    }
}

export const getBusinessesByCurrentUser = () => async (dispatch) => {
    const response = await csrfFetch(`/api/businesses/current`);

    if (response.ok) {
        const businessData = await response.json();
        dispatch(loadBusinesses(businessData.Businesses));
    }
}

export const createNewBusiness = (formData) => async (dispatch) => {
    const response = await csrfFetch(`/api/businesses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const newBusiness = await response.json();
        dispatch(addBusiness(newBusiness));
        return newBusiness;
    }
}

export const updateBusiness = (formData) => async (dispatch) => {
    const response = await csrfFetch(`/api/businesses/${formData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        const updatedBusiness = await response.json();
        dispatch(addBusiness(updatedBusiness));
        return updatedBusiness;
    }
}

export const deleteBusiness = (businessId) => async (dispatch) => {
    const response = await csrfFetch(`/api/businesses/${businessId}`, { method: 'DELETE' });

    if (response.ok) {
        dispatch(removeBusiness(businessId));
    }
}


const initialState = {};

const BusinessReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BUSINESSES: {
            const newState = {};
            action.businesses.forEach(business => { newState[business.id] = business });
            return newState;
        }
        case ADD_BUSINESS: {
            if (!state[action.business.id]) {
                const newState = {
                    ...state,
                    [action.business.id]: action.business
                };
                return newState;
            }
            return {
                ...state,
                [action.business.id]: {
                    ...state[action.business.id],
                    ...action.business
                }
            };
        }
        case REMOVE_BUSINESS: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
}

export default BusinessReducer;
