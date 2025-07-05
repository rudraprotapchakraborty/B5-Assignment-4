import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from './booksApi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function BookList() {
  const { data: books, isLoading, isError } = useGetBooksQuery()
  const [deleteBook] = useDeleteBookMutation()
  const navigate = useNavigate()

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id).unwrap()
        toast.success('Book deleted successfully!')
      } catch {
        toast.error('Failed to delete book')
      }
    }
  }

  if (isLoading) return <p>Loading books...</p>
  if (isError || !books) return <p>Error loading books</p>

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">All Books</h2>
      <table className="w-full border table-auto text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>ISBN</th>
            <th>Copies</th>
            <th>Available</th>
            <th className="w-44">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="text-center border-b">
              <td className="p-2 font-medium">{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.isbn}</td>
              <td>{book.copies}</td>
              <td>{book.available ? '✅' : '❌'}</td>
              <td className="space-x-2">
                <Link to={`/books/${book._id}`} className="text-blue-600 underline">
                  View
                </Link>
                <Link to={`/edit-book/${book._id}`} className="text-yellow-600 underline">
                  Edit
                </Link>
                <button onClick={() => handleDelete(book._id)} className="text-red-600 underline">
                  Delete
                </button>
                <button
                  onClick={() => navigate(`/borrow/${book._id}`)}
                  className="text-green-600 underline"
                >
                  Borrow
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
