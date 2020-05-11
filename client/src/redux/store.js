import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root.reducers';
// import storage from 'redux-persist/es/storage';
// import { persistStore, persistReducer } from 'redux-persist';

let composeEnhancer = '';

if(process.env.NODE_ENV === 'development')
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
else
    composeEnhancer = compose;

const middlewares = [thunk];

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(...middlewares)));
export default store;

// const persistConfig = {
//     key: 'root',
//     storage: storage,
//     whitelist: [
//       'transaction',
//     ],
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(...middlewares)));
// let persistor = persistStore(store);

// export {
//     store, persistor
// };