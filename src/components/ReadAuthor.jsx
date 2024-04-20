import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ReadAuthor() {
  const [author, setAuthor] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://662146d13bf790e070b26ed7.mockapi.io/authors/${id}`);
        if (response.status === 200) {
          setAuthor(response.data);
        }
      } catch (error) {
        console.log("Error fetching author:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-sm-10 col-md-8 col-lg-6 col-xl-6">
          <div className="border bg-white shadow p-4 mb-2 rounded">
            <h2 className="text-center">Detail of Author</h2>
            <div className="mb-3">
              <strong>Name: </strong>
              {author.name}
            </div>
            <div className="mb-3">
              <strong>Date Of Birth: </strong>
              {author.dob}
            </div>
            <div className="mb-3">
              <strong>Biography: </strong>
              {author.bio}
            </div>
            <div className="mb-3">
              <strong>Image Url: </strong>
              {author.image}
            </div>
            <div className="d-grid gap-2">
              <Link to={`/edit-author/${id}`} className="btn btn-success">
                Edit
              </Link>
              <Link to="/authors" className="btn btn-primary mt-2">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadAuthor;
