import { useParams, useNavigate } from "react-router-dom";
import { useBorrowBookMutation } from "../borrow/borrowApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGetBookByIdQuery } from "../api/apiSlice";

export default function BorrowBook() {
  const { bookId } = useParams();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(bookId!);
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [borrowBook] = useBorrowBookMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book) return;
    if (quantity > book.copies) {
      toast.error("Quantity exceeds available copies");
      return;
    }

    try {
      const isoDueDate = new Date(dueDate).toISOString();
      await borrowBook({
        book: bookId!,
        quantity,
        dueDate: isoDueDate,
      }).unwrap();
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch {
      toast.error("Borrow failed");
    }
  };

  if (isLoading) return <p>Loading book...</p>;
  if (isError || !book) return <p>Failed to load book</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 space-y-4">
      <h2 className="text-xl font-bold">Borrow: {book.data.title}</h2>
      <p>Available Copies: {book.data.copies}</p>
      <input
        type="number"
        min={1}
        max={book.copies}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
        className="w-full border px-3 py-2 rounded"
        placeholder="Quantity"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
        className="w-full border px-3 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
