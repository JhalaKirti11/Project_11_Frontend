// import { configureStore } from '@reduxjs/toolkit'
// import userReducer from '../redux/userSlice.js'

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//   },
// })

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  user: userReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store);