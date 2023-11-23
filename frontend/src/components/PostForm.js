import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../utils/auth";
import { useState } from "react";

function PostForm({ method, post }) {
  const navigate = useNavigate();
  const [error, setError] = useState();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues: initialValues });

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

    const token = getAuthToken();
    if (token === "EXPIRED") return setError("Your token has expired. Please login again.");

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) return setError("You are not authorized to do this.");
    if (response.status === 404)
      return setError("The user you are trying to authenticate with doesn't exist.");
    if (!response.ok) return setError("Could not save the post.");

    navigate("..");
  }

  return (
    <>
      <h1>Edit Post</h1>
      {error && <p style={{ textAlign: "center" }}>{error}</p>}
      <Form noValidate method={method} onSubmit={handleSubmit(submitHandler)}>
        <Row className="justify-content-md-center">
          <Col lg={10} xl={8}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                {...register("title")}
                isInvalid={!!errors.title}
              ></Form.Control>
              <p className="errors">{errors.title?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                name="imageURL"
                type="url"
                {...register("imageURL")}
                isInvalid={!!errors.imageURL}
              ></Form.Control>
              <p className="errors">{errors.imageURL?.message}</p>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Post Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="content"
                {...register("content")}
                isInvalid={!!errors.content}
              ></Form.Control>
              <p className="errors">{errors.content?.message}</p>
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
    </>
  );
}

export default PostForm;
