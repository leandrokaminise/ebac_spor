import { configureStore } from '@reduxjs/toolkit'
import  carrinhoSlice from './reducers/carrinho'
import favoritoSlice from './reducers/favorito'
import {api} from '../services/api'

export const store = configureStore({
  reducer: {
    carrinho: carrinhoSlice,
    favorito: favoritoSlice,
    [api.reducerPath]: api.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
