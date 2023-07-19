import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IBookState = {
  page: number;
  limit: number;
  sortBy: 'title' | 'author' | 'publishedAt';
  sortOrder: 'asc' | 'desc';
  searchTerm: string;
  title: string;
  author: string;
  genre: string;
};

const initialState: IBookState = {
  page: 1,
  limit: 10,
  sortBy: 'title',
  sortOrder: 'asc',
  searchTerm: '',
  title: '',
  author: '',
  genre: '',
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
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.author = '';
      state.genre = '';
      state.title = '';
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
      state.author = '';
      state.genre = '';
      state.searchTerm = '';
    },
    setAuthor: (state, action: PayloadAction<string>) => {
      state.author = action.payload;
      state.genre = '';
      state.searchTerm = '';
      state.title = '';
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
      state.searchTerm = '';
      state.author = '';
      state.title = '';
    },
  },
});
export const {
  setLimit,
  setPage,
  setSortBy,
  setSortOrder,
  setSearchTerm,
  setAuthor,
  setGenre,
  setTitle,
} = bookSlice.actions;
export default bookSlice.reducer;
