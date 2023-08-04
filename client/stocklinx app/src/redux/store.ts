import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import accessoryReducer from "./reducers/accessory-reducer";
import { rootSaga } from "./rootSaga";

const reducer = combineReducers({
  accessory: accessoryReducer,
});
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);

export default store;
