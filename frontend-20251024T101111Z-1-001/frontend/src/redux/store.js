// store.js - Redux store configuration with Redux Persist
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import projectsReducer from './projectsSlice';

// Redux Persist configuration
const persistConfig = {
  key: 'workflowBuilder',
  storage,
  whitelist: ['projects'], // only persist projects slice
};

const persistedReducer = persistReducer(persistConfig, projectsReducer);

export const store = configureStore({
  reducer: {
    projects: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types from redux-persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

