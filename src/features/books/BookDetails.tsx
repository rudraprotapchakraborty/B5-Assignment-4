import { useParams } from 'react-router-dom'
import { useGetBookQuery } from './booksApi'

export default function BookDetails() {
  const { id } = useParams()
  const { data: book, isLoading, isError } = useGetBookQuery(id!)

  if (isLoading) return <p>Loading book...</p>
  if (isError || !book) return <p>Book not found</p>

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 border shadow-sm rounded">
      <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Copies:</strong> {book.copies}</p>
      <p><strong>Available:</strong> {book.available ? '✅ Yes' : '❌ No'}</p>
      <p><strong>Description:</strong> {book.description}</p>
    </div>
  )
}
