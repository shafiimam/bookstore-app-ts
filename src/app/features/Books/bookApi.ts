import api from '@/app/api/apiSlice';
import { IBook } from '@/types/globalTypes';

type IBookFilter = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  searchTerm: string;
  title: string;
  author: string;
  genre: string;
};

type IBooksResponse = {
  data: IBook[];
  meta: {
    limit: number;
    page: number;
    total: number;
  };
  statusCode: number;
  success: boolean;
  message: string;
};
type IBookDetailsResponse = {
  data: IBook;
  meta: {
    limit: number;
    page: number;
    total: number;
  };
  statusCode: number;
  success: boolean;
  message: string;
};

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IBooksResponse, IBookFilter>({
      query: ({
        page,
        limit,
        sortBy,
        sortOrder,
        searchTerm,
        title,
        author,
        genre,
      }) => {
        if (title)
          return `/book?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchTerm=${searchTerm}&title=${title}`;
        if (author)
          return `/book?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchTerm=${searchTerm}&author=${author}`;
        if (genre)
          return `/book?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchTerm=${searchTerm}&genre=${genre}`;
        return `/book?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&searchTerm=${searchTerm}`;
      },
      providesTags: ['books'],
    }),
    getBookDetails: builder.query<IBookDetailsResponse, string>({
      query: (id) => `/book/${id}`,
      providesTags: ['book'],
    }),
    postReview: builder.mutation<IBook, { id: string; review: string }>({
      query: ({ id, review }) => {
        return {
          url: `/book/review/${id}`,
          method: 'POST',
          body: { review },
        };
      },
      invalidatesTags: ['book'],
    }),
    editBook: builder.mutation<IBook, { id: string; book: Partial<IBook> }>({
      query: ({ id, book }) => {
        return {
          url: `/book/${id}`,
          method: 'PUT',
          body: book,
        };
      },
      invalidatesTags: ['book'],
    }),
    deleteBook: builder.mutation<IBook, string>({
      query: (id) => {
        return {
          url: `/book/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookDetailsQuery,
  usePostReviewMutation,
  useEditBookMutation,
  useDeleteBookMutation,
} = booksApi;
