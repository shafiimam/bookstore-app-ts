import api from '@/app/api/apiSlice';
import { IBook } from '@/types/globalTypes';

const heroApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHeroBooks: builder.query<IBook[], void>({
      query: () => '/book?page=1&limit=10&sortBy=createdAt&sortOrder=asc',
    }),
  }),
});

export const { useGetHeroBooksQuery } = heroApi;
