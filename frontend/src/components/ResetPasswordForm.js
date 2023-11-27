import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

function ResetPasswordForm() {
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState();
  const [searchParams] = useSearchParams();

  const schema = yup.object().shape({
    password: yup
      .string()
      .trim()
      .min(10, "Password is too short.")
      .required("Please choose a password."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function submitHandler(values) {
    const password = values.password;
    const resetToken = searchParams.get("token");

    const response = await fetch("http://localhost:4000/password/reset", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + resetToken,
      },
      body: JSON.stringify({ password }),
    });

    if (response.status === 401 || response.status === 404 || response.status === 422) {
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  isInvalid={!!errors.email}
                  {...register("password")}
                ></Form.Control>
                <p className="errors">{errors.password?.message}</p>
              </Form.Group>
              <Form.Group className="float-end">
                <Button className="ms-3" variant="primary" type="submit">
                  Reset Password
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      )) || (
        <p className="centered">
          Your password has been reset. You can login now with your new password.
        </p>
      )}
    </>
  );
}

export default ResetPasswordForm;
