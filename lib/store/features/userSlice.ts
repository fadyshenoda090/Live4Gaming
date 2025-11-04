import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Profile {
  id: string
  username: string
  fullName?: string
  avatar?: string
  email?: string
}

export interface AuthState {
  user: Profile | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

// Placeholder thunks. Later, wire to Supabase auth APIs
export const login = createAsyncThunk(
  'auth/login',
  async (params: { email: string; password: string }) => {
    // TODO: Replace with Supabase auth
    await new Promise(res => setTimeout(res, 400))
    return { id: 'demo', username: params.email.split('@')[0], email: params.email } as Profile
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (params: { email: string; password: string; username?: string }) => {
    // TODO: Replace with Supabase signUp
    await new Promise(res => setTimeout(res, 600))
    return { id: 'demo', username: params.username || params.email.split('@')[0], email: params.email } as Profile
  }
)

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async () => {
    // TODO: Replace with Supabase getUser
    await new Promise(res => setTimeout(res, 200))
    return null as Profile | null
  }
)

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Profile | null>) {
      state.user = action.payload
    },
    logout(state) {
      state.user = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
      })

      .addCase(register.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Register failed'
      })

      .addCase(fetchProfile.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch profile'
      })
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
