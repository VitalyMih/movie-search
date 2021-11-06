import {GET_FRAMES, GET_MOVIE, GET_MOVIES, IS_EMPTY, IS_ERROR, SET_LOADING} from "../types";

export const KinopoiskReducer = (state, action) => {
    switch (action.type) {
        case GET_MOVIES: return {...state, movies: action.payload, loading: false};
        case GET_MOVIE: return {...state, movie: action.payload, loading: false};
        case SET_LOADING: return {...state, loading: action.payload};
        case GET_FRAMES: return {...state, frames: action.payload};
        case IS_EMPTY: return {...state, empty: action.payload};
        case IS_ERROR: return {...state, error: action.payload.error, errorMessage: action.payload.errorMessage};
        default: return state;
    }
}