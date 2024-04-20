import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";

function Dashboard() {
  let [books, setBooks] = useState([]);
  let navigate = useNavigate();

  const getData = async () => {
    try {
      let response = await axios.get(
        "https://662146d13bf790e070b26ed7.mockapi.io/books/"
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

  return (
    <div className="container">
      <Topbar />
      <div className="row">
        {books.map((book) => (
          <div
            key={book.id}
            className="col-sm-6 col-md-4 col-lg-4 col-xl-4 col-div"
          >
            <div className="card h-100 main-card" id={book.title}>
              <div className="card-header">
                <h3 className="card-title">{book.title}</h3>
              </div>
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <img
                  src={book.image}
                  alt={book.title}
                  className="card-img-top"
                />
                <div className="card-text">
                  <p>
                    <strong>Author: </strong>
                    {book.author}
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {book.description}
                  </p>
                  <p>
                    <strong>ISBN Number: </strong>
                    {book.isbn}
                  </p>
                  <p>
                    <strong>Published Date: </strong>
                    {book.pub_date}
                  </p>
                </div>
                <button
                  className="btn btn-lg btn-outline-warning"
                  onClick={() => navigate("/authorinfo/" + book.id)}
                >
                  About Author
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
