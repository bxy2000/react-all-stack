import {applyMiddleware, createStore} from "redux";
import incrementReducer from "../reducers";
import createSagaMiddleware from 'redux-saga';
import {watchIncrementAsync} from "../sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(incrementReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchIncrementAsync);

export default store;

