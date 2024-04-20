import axios from "axios";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Topbar from "./Topbar";
import { Button, Col, Container, Row } from "react-bootstrap";

function EditAuthor() {
  let params = useParams();
  let [initialValues, setValues] = useState({
    name: "",
    bio: "",
    dob: "",
    image: "",
  });

  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: initialValues,
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
        .required("Image URL is required")
        .url("Enter a valid URL for the image"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      let { id } = params;
      values.id = id;
      try {
        let response = await axios.put(
          `https://662146d13bf790e070b26ed7.mockapi.io/authors/${params.id}`,
          values
        );
        if (response.status === 200) {
          navigate("/authors");
        }
      } catch (error) {
        console.log("Error in updating data", error);
      }
    },
  });

  useEffect(() => {
    const getAuthorData = async () => {
      let { id } = params;
      try {
        let response = await axios.get(
          `https://662146d13bf790e070b26ed7.mockapi.io/authors/${id}`
        );
        if (response.status === 200) {
          setValues({
            name: response.data.name,
            bio: response.data.bio,
            dob: response.data.dob,
            image: response.data.image,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAuthorData();
  }, [params]);

  return (
    <div className="container">
      <Topbar />
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <h1 className="text-center mt-2">Update Author Record</h1>
            <FormikProvider value={formik}>
              <Form className="mt-2">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Author Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter author name"
                    className="form-control"
                  />
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
                <Button variant="success" type="submit">
                  Update
                </Button>
                <Link to="/authors" className="btn btn-primary ms-3">
                  Back
                </Link>
              </Form>
            </FormikProvider>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditAuthor;
