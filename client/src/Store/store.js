import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

import mainReducer from './reducer';

const appStore = createStore(mainReducer, applyMiddleware(thunk));

export default appStore;