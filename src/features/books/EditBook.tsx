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

  const genres = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ] as const;

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-8 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Edit Book</h2>

      {["title", "author", "isbn"].map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block mb-1 font-medium capitalize">
            {field}
          </label>
          <input
            id={field}
            name={field}
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
      ))}

      <div>
        <label htmlFor="genre" className="block mb-1 font-medium capitalize">
          Genre
        </label>
        <select
          id="genre"
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="" disabled>
            Select genre
          </option>
          {genres.map((g) => (
            <option key={g} value={g}>
              {g.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block mb-1 font-medium capitalize"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          rows={4}
        />
      </div>

      <div>
        <label htmlFor="copies" className="block mb-1 font-medium capitalize">
          Copies
        </label>
        <input
          id="copies"
          name="copies"
          type="number"
          min={0}
          value={form.copies}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Update Book
      </button>
    </form>
  );
}
