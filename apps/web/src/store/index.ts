import authReducer from './modules/auth';
import createSaga from 'redux-saga';
import rootSaga from './modules/auth/saga';
import { configureStore } from '@reduxjs/toolkit';

const sagaMiddleware = createSaga();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store;