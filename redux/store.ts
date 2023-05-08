import { createSlice, configureStore } from '@reduxjs/toolkit'

const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {}
})

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer
  }
})

export {
  store,
}
