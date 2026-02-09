import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query — createApi defines an API service
// It auto-generates React hooks for each endpoint
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({
    // Query endpoints — for fetching data
    getUsers: builder.query({
      query: () => '/users',
      providesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    // RTK Query Posts (alternative to thunk-based approach)
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    // Mutation endpoints — for creating/updating/deleting data
    addUser: builder.mutation({
      query: (newUser) => ({
        url: '/users',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['User'], // auto-refetch users after adding
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Auto-generated hooks!
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetPostsQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = apiSlice;
