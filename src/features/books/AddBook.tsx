import { useAddBookMutation } from "./booksApi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddBook() {
  const genres = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ] as const;

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  const [addBook] = useAddBookMutation();
  const navigate = useNavigate();

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
      await addBook(form).unwrap();
      toast.success("Book added successfully!");
      navigate("/books");
    } catch {
      toast.error("Failed to add book.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">
        Add New Book
      </h2>

      {["title", "author", "isbn"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {field}
          </label>
          <input
            name={field}
            value={form[field as keyof typeof form]}
            onChange={handleChange}
            placeholder={`Enter ${field}`}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            required
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
          genre
        </label>
        <select
          name="genre"
          value={form.genre}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Brief description..."
          value={form.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Number of Copies
        </label>
        <input
          name="copies"
          type="number"
          min={1}
          value={form.copies}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 rounded-lg transition shadow"
      >
        Add Book
      </button>
    </form>
  );
}
