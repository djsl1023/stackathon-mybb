import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import blobsReducer from './allBlobs';
import accountReducer from './account';
import blobReducer from './singleBlob';

const reducer = combineReducers({
  account: accountReducer,
  blobs: blobsReducer,
  blob: blobReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collpased: true }))
);
const store = createStore(reducer, middleware);

export default store;
