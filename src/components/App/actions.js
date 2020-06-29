import { CONVERT_IMAGE_REQUEST, CONVERT_IMAGE_SUCCESS, CONVERT_IMAGE_ERROR } from './types'

export const convertImageRequest = (data) => ({
    type: CONVERT_IMAGE_REQUEST,
    data,
})

export const convertImageSuccess = (data) => ({
    type: CONVERT_IMAGE_SUCCESS,
    data,
})

export const convertImageError = (data) => ({
    type: CONVERT_IMAGE_ERROR,
    data,
})