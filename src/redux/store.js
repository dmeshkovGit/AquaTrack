import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/slice';
import waterReducer from './water/slice';

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['refreshToken'], // вказати яку властивість зберігти, поки що додав тільки токен
};
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    water: waterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
