import axios from "axios";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Topbar from "./Topbar";
import { Button, Col, Container, Row } from "react-bootstrap";

function CreateAuthor() {
  const navigate = useNavigate();
  const [existingAuthors, setExistingAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(
          "https://662146d13bf790e070b26ed7.mockapi.io/authors"
        );
        if (response.status === 200) {
          setExistingAuthors(response.data);
        }
      } catch (error) {
        console.log("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  const handleAuthorSelect = (selectedAuthorName) => {
    const selectedAuthor = existingAuthors.find(
      (author) => author.name === selectedAuthorName
    );
    if (selectedAuthor) {
      formik.setValues({
        ...formik.values,
        name: selectedAuthor.name,
        dob: selectedAuthor.dob,
        bio: selectedAuthor.bio,
        image: selectedAuthor.image,
      });
    }
  };

  let formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
      dob: "",
      image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name should be at least 3 characters")
        .max(20, "Name cannot exceed 20 characters")
        .required("Name is required!"),
      dob: Yup.string()
        .required("Date of Birth is required!")
        .matches(/^\d{2}-\d{2}-\d{4}$/, "Date must be in DD-MM-YYYY format"),
      bio: Yup.string()
        .required("Biography is required!")
        .min(20, "Biography must be at least 20 characters")
        .max(500, "Biography cannot exceed 500 characters"),
      image: Yup.string()
        .required("Image Url is required")
        .url("Enter a valid URL for the image"),
    }),
    onSubmit: async (values) => {
      try {
        let response = await axios.post(
          "https://662146d13bf790e070b26ed7.mockapi.io/authors",
          values
        );
        if (response.status === 201) {
          navigate("/");
        }
      } catch (error) {
        console.log("Error in creating author", error);
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
                  <label htmlFor="name" className="form-label">
                    Author Name
                  </label>
                  <div className="d-flex">
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter author name"
                      className="form-control me-2"
                    />
                    <Field
                      as="select"
                      name="selectAuthor"
                      className="form-select"
                      onChange={(event) =>
                        handleAuthorSelect(event.target.value)
                      }
                    >
                      <option value="">Select an author</option>
                      {existingAuthors
                        .reduce((uniqueAuthors, author) => {
                          return uniqueAuthors.includes(author.name)
                            ? uniqueAuthors
                            : [...uniqueAuthors, author.name];
                        }, [])
                        .map((authorName) => (
                          <option key={authorName} value={authorName}>
                            {authorName}
                          </option>
                        ))}
                    </Field>
                  </div>
                  <ErrorMessage name="name">
                    {(errorMsg) => <div className="error">{errorMsg}</div>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <label htmlFor="dob" className="form-label">
                    Date Of Birth
                  </label>
                  <Field
                    type="text"
                    id="dob"
                    name="dob"
                    placeholder="Enter date of birth"
                    className="form-control"
                  />
                  <ErrorMessage name="dob">
                    {(errorMsg) => <div className="error">{errorMsg}</div>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <label htmlFor="bio" className="form-label">
                    Biography
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    id="bio"
                    name="bio"
                    placeholder="Enter author biography"
                    className="form-control"
                  />
                  <ErrorMessage name="bio">
                    {(errorMsg) => <div className="error">{errorMsg}</div>}
                  </ErrorMessage>
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Image Url
                  </label>
                  <Field
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Author image url"
                    className="form-control"
                  />
                  <ErrorMessage name="image">
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

export default CreateAuthor;
