import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import { Table, Button } from "react-bootstrap";

function AuthorRecords() {
  const [authors, setAuthors] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://662146d13bf790e070b26ed7.mockapi.io/authors/"
      );
      if (response.status === 200) {
        setAuthors(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this author?"
    );
    if (confirmDelete) {
      axios
        .delete(`https://662146d13bf790e070b26ed7.mockapi.io/authors/${id}`)
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
      <div className="author-container">
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.name}</td>
                <td>{author.dob}</td>
                <td>
                  <Link
                    to={`/read-author/${author.id}`}
                    className="btn btn-outline-info me-2"
                  >
                    Read
                  </Link>
                  <Link
                    to={`/edit-author/${author.id}`}
                    className="btn btn-outline-primary me-2"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(author.id)}
                  >
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

export default AuthorRecords;
