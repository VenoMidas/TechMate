import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchStatus(action) {
    try {
        const status = yield axios.get(`/api/message/${action.payload}`);
        yield put({ type: 'SET_STATUS', payload: status.data });
    } catch (error) {
        console.log('Error in fetchStatus', error);
        alert('Something went wrong!');
    };
};

function* messageSaga() {
    yield takeLatest('FETCH_STATUS', fetchStatus);
}

export default messageSaga;