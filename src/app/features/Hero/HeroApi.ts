import api from '@/app/api/apiSlice';
import { IBook } from '@/types/globalTypes';

type IHeroResponse = {
  data: IBook[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  statusCode: number;
  success: boolean;
  message: string;
};

const heroApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHeroBooks: builder.query<IHeroResponse, void>({
      query: () => '/book?page=1&limit=10&sortBy=createdAt&sortOrder=asc',
      providesTags: ['hero-books'],
    }),
  }),
});

export const { useGetHeroBooksQuery } = heroApi;
