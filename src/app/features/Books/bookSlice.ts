import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IBookState = {
  page: number;
  limit: number;
  sortBy: 'title' | 'author' | 'publishedAt';
  sortOrder: 'asc' | 'desc';
};

const initialState: IBookState = {
  page: 1,
  limit: 10,
  sortBy: 'title',
  sortOrder: 'asc',
};

const bookSlice = createSlice({
  name: 'book',
  initialState: initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setSortBy: (
      state,
      action: PayloadAction<'title' | 'author' | 'publishedAt'>
    ) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
  },
});
export const { setLimit, setPage, setSortBy, setSortOrder } = bookSlice.actions;
export default bookSlice.reducer;
