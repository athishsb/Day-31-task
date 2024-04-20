import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import { Table, Button } from "react-bootstrap";

function BookRecords() {
  const [books, setBooks] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://662146d13bf790e070b26ed7.mockapi.io/books"
      );
      if (response.status === 200) {
        setBooks(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      axios
        .delete(`https://662146d13bf790e070b26ed7.mockapi.io/books/${id}`)
        .then(() => {
          getData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="container">
      <Topbar />
      <div className="book-container">
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN Number</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.pub_date}</td>
                <td>
                  <Link to={`/read-book/${book.id}`} className="btn btn-outline-info me-2">
                    Read
                  </Link>
                  <Link to={`/edit-book/${book.id}`} className="btn btn-outline-primary me-2">
                    Edit
                  </Link>
                  <Button variant="outline-danger" onClick={() => handleDelete(book.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default BookRecords;
