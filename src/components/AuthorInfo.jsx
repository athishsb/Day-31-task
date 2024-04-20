import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Topbar from "./Topbar";
import { Card, Col, Row, Alert } from "react-bootstrap";

function AuthorInfo() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://662146d13bf790e070b26ed7.mockapi.io/authors/${id}`
        );
        if (response.status === 200) {
          setAuthor(response.data);
        }
      } catch (error) {
        setError("Author not found. Please add author details.");
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="container">
      <Topbar />
      <div className="author-info-container">
        {error && (
          <Alert variant="warning" className="m-5">
            {error}
          </Alert>
        )}
        {author && (
          <Row className="justify-content-center m-5 p-2">
            <Col md={6}>
              <Card>
                <Card.Header as="h3" className="text-center">{author.name}</Card.Header>
                <Card.Img variant="top" src={author.image} alt={author.name} />
                <Card.Body>
                  <Card.Title className="mt-2 text-center"><strong>DOB: </strong>{author.dob}</Card.Title>
                  <Card.Text className="mt-2"><strong>Bio: </strong>{author.bio}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
}

export default AuthorInfo;
