import createSaga from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import authReducer from './modules/auth';
import walletReducer from './modules/wallet';
import transactionReducer from './modules/transaction';

import rootSaga from './modules/auth/saga';

const sagaMiddleware = createSaga();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;