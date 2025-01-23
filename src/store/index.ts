import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/store/counter/counterSlice';// esta importacion es lo que se está exportando por defecto de src/store/counter/counterSlice.ts.
import pokemonsReducer from '@/store/pokemons/pokemons';
import { useDispatch, useSelector } from 'react-redux'
// import { localStorageMiddleware } from './middlewares/localstorage-middleware';

export const store = configureStore({
  reducer: {
    counterReducer,
    pokemonsReducer: pokemonsReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()