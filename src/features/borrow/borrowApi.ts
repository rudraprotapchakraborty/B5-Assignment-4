import { apiSlice } from '../api/apiSlice'

export const borrowApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    borrowBook: builder.mutation<{ success: boolean }, { bookId: string; quantity: number; dueDate: string }>({
      query: (data) => ({
        url: '/borrow',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Books', 'BorrowSummary'],
    }),
    getBorrowSummary: builder.query<
      { bookTitle: string; isbn: string; totalQuantityBorrowed: number }[],
      void
    >({
      query: () => '/borrow-summary',
      providesTags: ['BorrowSummary'],
    }),
  }),
})

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi
