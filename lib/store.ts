import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import gamesReducer from './store/features/gamesSlice'
import tournamentsReducer from './store/features/tournamentsSlice'
import userReducer from './store/features/userSlice'

export const makeStore = () =>
  configureStore({
    reducer: {
      games: gamesReducer,
      tournaments: tournamentsReducer,
      user: userReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
  })

// Create a store singleton for the client Provider
export const store = makeStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
