import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Game } from '@/types/types'

export interface GamesState {
  items: Game[]
  page: number
  totalPages: number
  loading: boolean
  error: string | null
}

const initialState: GamesState = {
  items: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
}

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (opts: { page?: number; limit?: number } | undefined) => {
    const page = opts?.page ?? 1
    const limit = opts?.limit ?? 12
    const res = await fetch(`/api/games?page=${page}&limit=${limit}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch games')
    const data = await res.json()
    return { items: data.data as Game[], totalPages: data.totalPages as number, page }
  }
)

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    reset(state) {
      Object.assign(state, initialState)
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGames.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
        state.totalPages = action.payload.totalPages
        state.page = action.payload.page
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Unknown error'
      })
  },
})

export const { setPage, reset } = gamesSlice.actions
export default gamesSlice.reducer
