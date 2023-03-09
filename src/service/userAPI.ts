import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '../types';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userApi = createApi({
  baseQuery: async (...args) => {
    await sleep(1000);
    return fetchBaseQuery({ baseUrl: 'http://localhost:4000/' })(...args);
  },
  tagTypes: ['User'],
  endpoints: build => ({
    //
    getAllUsers: build.query<User[], void>({
      query: () => 'users',
      providesTags: result =>
        result //
          ? [...result.map(({ id }) => ({ type: 'User' as const, id })), { type: 'User', id: 'LIST' }]
          : [{ type: 'User', id: 'LIST' }],
    }),

    getUserById: build.query<User, User['id']>({
      query: id => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),

    addUser: build.mutation<User, Omit<User, 'id'>>({
      query: body => ({
        url: `users`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    updateUser: build.mutation<User, Pick<User, 'id'> & Partial<User>>({
      query: ({ id, ...patch }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),

    deleteUser: build.mutation<{ success: boolean; id: number }, User['id']>({
      query: id => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'User', id }],
    }),
  }),
});
