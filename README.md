# Library Management System 📚

## Project Overview
A minimal library management system built with React, Redux Toolkit Query (RTK Query), and TypeScript.  
Allows users to view a list of books, perform CRUD operations, borrow books, and view a borrow summary.  
No authentication, category filters, or payment integration included.

---

## Features

### 1. Public Routes 🚀
- All pages accessible without login/authentication.
- Focus on essential book and borrowing features only.

### 2. Book Management 🛠️
- **Book List Table**  
  Displays all books with columns: Title, Author, Genre, ISBN, Copies, Availability, Actions.
- **Edit Book**  
  Edit form with existing book data, updates via API, UI updates instantly.
- **Delete Book**  
  Confirmation dialog before deletion.
- **Borrow Book**  
  Form to borrow a book with quantity and due date.
- **Add New Book**  
  Form to add a new book with fields: Title, Author, Genre, ISBN, Description, Copies, Available (optional, default true).

Business logic:  
- If copies = 0, book is marked unavailable.

### 3. Borrow Book
- Borrow form from book list.
- Fields: Quantity (max available copies), Due Date.
- After borrowing, updates book availability if needed.
- Redirects to borrow summary with success message.

### 4. Borrow Summary
- Shows aggregated list of borrowed books.
- Columns: Book Title, ISBN, Total Quantity Borrowed.

---

## Pages & Routes

| Route               | Description                         |
|---------------------|-----------------------------------|
| `/books`            | List all books, with actions.     |
| `/create-book`      | Form to add a new book.            |
| `/books/:id`        | Detailed view of a single book.    |
| `/edit-book/:id`    | Edit existing book details.        |
| `/borrow/:bookId`   | Borrow a selected book form.       |
| `/borrow-summary`   | Summary of all borrowed books.     |

---

## UI Components

- **Navbar**: Navigation links to All Books, Add Book, Borrow Summary.
- **Book Table/List/Grid**: Display book data with action buttons.
- **Footer**: Site info or credits.
- Forms use minimal and clean UI design, styled with Tailwind CSS or basic CSS.
- Fully responsive for mobile, tablet, and desktop.

---

## Technology Stack

| Layer           | Technology                  |
|-----------------|-----------------------------|
| Frontend        | React + TypeScript          |
| State Management| Redux Toolkit + RTK Query   |
| Backend         | Node.js + Express.js        |
| Database        | MongoDB + Mongoose          |
| Styling         | Tailwind CSS or basic CSS   |

---

## Technical Details

- API calls are implemented and managed via RTK Query with full TypeScript typing.
- State management handled by Redux Toolkit and RTK Query.
- Optional UI state slices (e.g., for modals) may be added if needed.
- Clean, maintainable code following best practices.

---
