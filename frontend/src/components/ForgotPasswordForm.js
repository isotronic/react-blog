import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";

function ForgotPasswordForm() {
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState();

  const schema = yup.object().shape({
    email: yup.string().trim().email("Invalid email.").required("Please type your email address."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function submitHandler(values) {
    const email = values.email;

    const response = await fetch("http://localhost:4000/password/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.status === 422 || response.status === 404) {
      const resData = await response.json();
      return setError(resData.message);
    }
    if (!response.ok) return setError("An error occured. Please try again later.");

    return setRequestSent(true);
  }

  return (
    <>
      {error && <p className="centered">{error}</p>}
      {(!requestSent && (
        <Form noValidate method="post" onSubmit={handleSubmit(submitHandler)}>
          <Row className="justify-content-md-center">
            <Col lg={6} xl={4}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  isInvalid={!!errors.email}
                  {...register("email")}
                ></Form.Control>
                <p className="errors">{errors.email?.message}</p>
              </Form.Group>
              <Form.Group className="float-end">
                <Button className="ms-3" variant="primary" type="submit">
                  Send Password Reset Link
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      )) || (
        <p className="centered">
          Your request has been sent. If a user with your email address exists, you will receive an
          email shortly.
        </p>
      )}
    </>
  );
}

export default ForgotPasswordForm;
