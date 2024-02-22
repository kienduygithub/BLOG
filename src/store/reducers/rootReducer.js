import { combineReducers } from 'redux';

// IMPORT REDUCER
import counterReducer from './counterReducer';
import userReducer from './userReducer';


import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const commonPersistConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const counterPersistConfig = {
    ...commonPersistConfig,
    key: 'counter',
    whitelist: [ 'count' ],
    backlist: []
}

const userPersistConfig = {
    ...commonPersistConfig,
    key: 'user',
    backlist: [ 'access_token' ]
}

const rootReducer = combineReducers({
    // counter: counterReducer
    counter: persistReducer(counterPersistConfig, counterReducer),
    user: persistReducer(userPersistConfig, userReducer)
});

export default rootReducer;