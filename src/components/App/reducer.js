import { fromJS } from 'immutable';
import { CONVERT_IMAGE_SUCCESS, CONVERT_IMAGE_REQUEST, CONVERT_IMAGE_ERROR } from './types'

export const initialState = fromJS({
    isLoading: false
})

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONVERT_IMAGE_REQUEST:
            return state.set('isLoading', true );
        case CONVERT_IMAGE_SUCCESS:
            return state.set('isLoading', false );
        case CONVERT_IMAGE_ERROR:
            return state.set('isLoading', false);
        default: return state
    }
}