import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AllBooks from './features/books/AllBooks'
import AddBook from './features/books/AddBook'
import BookDetails from './features/books/BookList'
import EditBook from './features/books/EditBook'
import BorrowBook from './features/borrow/BorrowBook'
import BorrowSummary from './features/borrow/BorrowSummary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/books" />} />
            <Route path="/books" element={<AllBooks />} />
            <Route path="/create-book" element={<AddBook />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/borrow/:bookId" element={<BorrowBook />} />
            <Route path="/borrow-summary" element={<BorrowSummary />} />
          </Routes>
        </main>

        <Footer />
        <ToastContainer position="top-right" />
      </div>
    </Router>
  )
}

export default App
