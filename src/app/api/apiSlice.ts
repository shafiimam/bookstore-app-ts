import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  reducerPath: 'api',
  tagTypes: ['hero-books'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bookstore-server-ts-shafiimam.vercel.app/api/v1',
  }),
  endpoints: () => ({}),
});

export default api;
