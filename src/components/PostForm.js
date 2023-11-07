import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { json } from "react-router-dom";

function PostForm({ method, post }) {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().trim().required("You need to give your Post a title."),
    content: yup.string().trim().required("Post content cannot be empty!"),
    imageURL: yup.string().trim().url("Not a valid URL.").required("Please provide an image URL."),
  });

  const initialValues = {
    title: post ? post.title : "",
    content: post ? post.content : "",
    imageURL: post ? post.imageURL : "",
  };

  function cancelHandler() {
    navigate("..");
  }

  async function submitHandler(values) {
    const data = {
      title: values.title,
      content: values.content,
      imageURL: values.imageURL,
    };

    let endpoint = "http://localhost:4000/new";

    if (method === "PATCH") {
      endpoint = "http://localhost:4000/edit/" + post._id;
    }

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw json({ message: "Could not save event." }, { status: 500 });
    }

    navigate("/posts");
  }

  return (
    <>
      <h1>Edit Post</h1>
      <Formik validationSchema={schema} onSubmit={submitHandler} initialValues={initialValues}>
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate method={method} onSubmit={handleSubmit}>
            <Row className="justify-content-md-center">
              <Col lg={10} xl={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    name="title"
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                    isValid={touched.title && !errors.title}
                    isInvalid={!!errors.title}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    name="imageURL"
                    type="url"
                    value={values.imageURL}
                    onChange={handleChange}
                    isValid={touched.imageURL && !errors.imageURL}
                    isInvalid={!!errors.imageURL}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.imageURL}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Post Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    isValid={touched.content && !errors.content}
                    isInvalid={!!errors.content}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.content}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="float-end">
                  <Button variant="secondary" type="button" onClick={cancelHandler}>
                    Cancel
                  </Button>
                  <Button className="ms-3" variant="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default PostForm;
