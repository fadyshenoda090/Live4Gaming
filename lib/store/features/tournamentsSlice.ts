import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Tournament } from '@/types/types'

export interface TournamentsState {
  items: Tournament[]
  page: number
  totalPages: number
  loading: boolean
  error: string | null
  current?: Tournament
  currentLoading: boolean
}

const initialState: TournamentsState = {
  items: [],
  page: 1,
  totalPages: 1,
  loading: false,
  error: null,
  current: undefined,
  currentLoading: false,
}

export const fetchTournaments = createAsyncThunk(
  'tournaments/fetchTournaments',
  async (opts: { page?: number; limit?: number } | undefined) => {
    const page = opts?.page ?? 1
    const limit = opts?.limit ?? 12
    const res = await fetch(`/api/tournaments?page=${page}&limit=${limit}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch tournaments')
    const data = await res.json()
    return { items: data.data as Tournament[], totalPages: data.totalPages as number, page }
  }
)

export const fetchTournamentById = createAsyncThunk(
  'tournaments/fetchTournamentById',
  async (id: string) => {
    const res = await fetch(`/api/tournaments/${id}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch tournament')
    const data = await res.json()
    return data.data as Tournament
  }
)

const tournamentsSlice = createSlice({
  name: 'tournaments',
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
      // list
      .addCase(fetchTournaments.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTournaments.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.items
        state.totalPages = action.payload.totalPages
        state.page = action.payload.page
      })
      .addCase(fetchTournaments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Unknown error'
      })

      // detail
      .addCase(fetchTournamentById.pending, state => {
        state.currentLoading = true
        state.error = null
      })
      .addCase(fetchTournamentById.fulfilled, (state, action) => {
        state.currentLoading = false
        state.current = action.payload
      })
      .addCase(fetchTournamentById.rejected, (state, action) => {
        state.currentLoading = false
        state.error = action.error.message || 'Unknown error'
      })
  },
})

export const { setPage, reset } = tournamentsSlice.actions
export default tournamentsSlice.reducer
