import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchStatus(action) {
    try {
        const response = yield axios.get(`/api/message/${action.payload}`);
        yield put({ type: 'SET_STATUS', payload: response.data });
    } catch (error) {
        console.log('Error in fetchStatus', error);
        alert('Something went wrong!');
    };
};

function* fetchTechStatus() {
    try {
        const response = yield axios.get(`/api/message/status/all`);
        yield put({ type: 'SET_TECH_STATUS', payload: response.data })
    } catch (error) {
        console.log('Error in fetchTechStatus', error);
        alert('Something went wrong!');
    };
};

function* messageSaga() {
    yield takeLatest('FETCH_STATUS', fetchStatus);
    yield takeLatest('FETCH_TECH_STATUS', fetchTechStatus)
}

export default messageSaga;