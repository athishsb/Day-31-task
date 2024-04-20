import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ReadBook() {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://662146d13bf790e070b26ed7.mockapi.io/books/${id}`);
        if (response.status === 200) {
          setBook(response.data);
        }
      } catch (error) {
        console.log("Error fetching book:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-sm-10 col-md-8 col-lg-6 col-xl-6">
          <div className="border bg-white shadow p-4 mb-2 rounded">
            <h2 className="text-center">Detail of Book</h2>
            <div className="mb-3">
              <strong>Title: </strong>
              {book.title}
            </div>
            <div className="mb-3">
              <strong>Author: </strong>
              {book.author}
            </div>
            <div className="mb-3">
              <strong>ISBN Number: </strong>
              {book.isbn}
            </div>
            <div className="mb-3">
              <strong>Published Date: </strong>
              {book.pub_date}
            </div>
            <div className="mb-3">
              <strong>Image Url: </strong>
              {book.image}
            </div>
            <div className="mb-3">
              <strong>Description: </strong>
              {book.description}
            </div>
            <div className="d-grid gap-2">
              <Link to={`/edit-book/${id}`} className="btn btn-success">
                Edit
              </Link>
              <Link to="/books" className="btn btn-primary mt-2">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadBook;
