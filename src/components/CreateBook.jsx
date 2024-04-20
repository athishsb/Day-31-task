import axios from "axios";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Topbar from "./Topbar";
import { Button, Col, Container, Row } from "react-bootstrap";

function CreateBook() {
  const navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      isbn: "",
      pub_date: "",
      description: "",
      image: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Title should be at least 3 characters")
        .max(50, "Title cannot exceed 50 characters")
        .required("Title is required!"),
      author: Yup.string()
        .min(3, "Author should be at least 3 characters")
        .max(20, "Author cannot exceed 20 characters")
        .required("Author is required!"),
      isbn: Yup.string()
        .matches(
          /^(?:\d{3}-\d{10}|\d{13})$/,
          "Enter a valid 13 digit ISBN number"
        )
        .required("ISBN number is required!"),
      pub_date: Yup.string()
        .required("Published Date is required!")
        .matches(/^\d{2}-\d{2}-\d{4}$/, "Date must be in DD-MM-YYYY format"),
      description: Yup.string()
        .required("Description is required!")
        .min(20, "Description must be at least 20 characters")
        .max(500, "Description cannot exceed 500 characters"),
      image: Yup.string()
        .required("Image URL is required")
        .url("Enter a valid URL for the image"),
    }),
    onSubmit: async (values) => {
      try {
        let response = await axios.post(
          "https://662146d13bf790e070b26ed7.mockapi.io/books",
          values
        );
        if (response.status === 201) {
          navigate("/create-author");
        }
      } catch (error) {
        console.log("Error in creating book", error);
      }
    },
  });

  return (
    <div className="container">
      <Topbar />
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <FormikProvider value={formik}>
              <Form className="mt-2">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter book title"
                    className="form-control"
                  />
                  <ErrorMessage name="title">
                    {(errorMsg) => <div className="error">{errorMsg}</div>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">
                    Author
                  </label>
                  <Field
                    type="text"
                    id="author"
                    name="author"
                    placeholder="Enter author name"
                    className="form-control"
                  />
                  <ErrorMessage name="author">
                    {(errorMsg) => <div className="error">{errorMsg}</div>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <label htmlFor="isbn" className="form-label">
                    ISBN Number
                  </label>
                  <Field
                    type="text"
                    id="isbn"
                    name="isbn"
                    placeholder="Enter ISBN number"
                    className="form-control"
                  />
                  <ErrorMessage name="isbn">
                    {(errorMsg) => <div className="error">{errorMsg}</div>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <label htmlFor="pub_date" className="form-label">
                    Published Date
                  </label>
                  <Field
                    type="text"
                    id="pub_date"
                    name="pub_date"
                    placeholder="Enter Published Date"
                    className="form-control"
                  />
                  <ErrorMessage name="pub_date">
                    {(errorMsg) => <div className="error">{errorMsg}</div>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image URL
                  </label>
                  <Field
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Enter image URL"
                    className="form-control"
                  />
                  <ErrorMessage name="image">
                    {(errorMsg) => <div className="error">{errorMsg}</div>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter book description"
                    className="form-control"
                  />
                  <ErrorMessage name="description">
                    {(errorMsg) => <div className="error">{errorMsg}</div>}
                  </ErrorMessage>
                </div>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </FormikProvider>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateBook;