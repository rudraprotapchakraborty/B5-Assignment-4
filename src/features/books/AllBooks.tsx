import { useGetBooksQuery, useDeleteBookMutation } from "../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

export default function AllBooks() {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();
  const navigate = useNavigate();

  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openModal = (id: string) => {
    setSelectedBookId(id);
    setShowConfirmModal(true);
  };

  const closeModal = () => {
    setSelectedBookId(null);
    setShowConfirmModal(false);
  };

  const confirmDelete = async () => {
    if (!selectedBookId) return;
    try {
      await deleteBook(selectedBookId).unwrap();
      toast.success("Book deleted successfully!");
    } catch {
      toast.error("Failed to delete book.");
    } finally {
      closeModal();
    }
  };

  if (isLoading)
    return <p className="p-6 text-gray-500 animate-pulse">Loading books...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error loading books.</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">All Books</h1>
        <button
          onClick={() => navigate("/create-book")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-md transition"
        >
          + Add New Book
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Author</th>
              <th className="px-5 py-3">Genre</th>
              <th className="px-5 py-3">ISBN</th>
              <th className="px-5 py-3">Copies</th>
              <th className="px-5 py-3">Availability</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books?.length > 0 ? (
              books.map((book) => (
                <tr
                  key={book._id}
                  className="border-t hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-5 py-3">{book.title}</td>
                  <td className="px-5 py-3">{book.author}</td>
                  <td className="px-5 py-3">{book.genre}</td>
                  <td className="px-5 py-3">{book.isbn}</td>
                  <td className="px-5 py-3">{book.copies}</td>
                  <td className="px-5 py-3">
                    {book.copies > 0 ? (
                      <span className="inline-block text-green-600 font-semibold">
                        Available
                      </span>
                    ) : (
                      <span className="inline-block text-red-500 font-semibold">
                        Unavailable
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => navigate(`/edit-book/${book._id}`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded text-xs font-medium transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openModal(book._id)}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs font-medium transition disabled:opacity-50"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/borrow/${book._id}`)}
                      disabled={book.copies === 0}
                      className={`px-3 py-1 rounded text-xs font-medium transition ${
                        book.copies === 0
                          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      Borrow
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-5 py-6 text-center text-gray-500 italic"
                >
                  No books available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Custom Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this book?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
