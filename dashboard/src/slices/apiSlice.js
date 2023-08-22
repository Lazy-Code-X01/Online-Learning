import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: 'https://onlinelearning-oaek.onrender.com/' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Admin'],
  endpoints: (builder) => ({
  }),
});
