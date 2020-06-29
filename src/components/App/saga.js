import {takeEvery, call} from 'redux-saga/effects'
import { CONVERT_IMAGE_REQUEST } from './types'
import { postRequestForConverting } from './request'

export function* convretToPDF(action) {
    const { data, handleSuccess, handleError } = action.data;
    try {
        const response = yield  call(postRequestForConverting, data)
        yield call(handleSuccess, response)
    } catch (errors) {
        yield call(handleError, errors)
    }
}


export default function* sagaWatcher() {
    yield takeEvery(CONVERT_IMAGE_REQUEST, convretToPDF)
}