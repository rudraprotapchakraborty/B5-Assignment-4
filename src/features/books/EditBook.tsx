import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery, useUpdateBookMutation } from "./booksApi";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditBook() {
  const { id } = useParams();
  const { data: book, isLoading } = useGetBookQuery(id!);
  const [updateBook] = useUpdateBookMutation();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
  });

  useEffect(() => {
    if (book && book.data) {
      const b = book.data;
      setForm({
        title: b.title,
        author: b.author,
        genre: b.genre,
        isbn: b.isbn,
        description: b.description || "",
        copies: b.copies,
      });
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBook({ id: id!, data: form }).unwrap();
      toast.success("Book updated successfully!");
      navigate("/books");
    } catch {
      toast.error("Failed to update book");
    }
  };

  if (isLoading) return <p>Loading book data...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
      {["title", "author", "genre", "isbn"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field as keyof typeof form]}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      ))}
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        name="copies"
        type="number"
        min={0}
        placeholder="Copies"
        value={form.copies}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Update Book
      </button>
    </form>
  );
}
