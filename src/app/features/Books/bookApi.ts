import api from '@/app/api/apiSlice';
import { IBook } from '@/types/globalTypes';

type IBookFilter = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
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

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<IBooksResponse, IBookFilter>({
      query: ({ page, limit, sortBy, sortOrder }) =>
        `/book?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;
