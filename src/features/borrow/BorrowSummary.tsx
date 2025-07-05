import { useGetBorrowSummaryQuery } from './borrowApi';

export default function BorrowSummary() {
  const { data, isLoading } = useGetBorrowSummaryQuery();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-12 text-center text-gray-600">
        <p className="text-lg">Loading summary...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Borrow Summary</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 border-b">Title</th>
              <th className="px-4 py-3 border-b">ISBN</th>
              <th className="px-4 py-3 border-b">Total Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((summary: any, index: number) => (
              <tr
                key={summary._id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-3 border-b font-medium text-gray-800">
                  {summary.book.title}
                </td>
                <td className="px-4 py-3 border-b text-gray-600">
                  {summary.book.isbn}
                </td>
                <td className="px-4 py-3 border-b text-blue-600 font-semibold">
                  {summary.totalQuantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
