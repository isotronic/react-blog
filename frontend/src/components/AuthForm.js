import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AuthForm({ mode }) {
  const [authError, setAuthError] = useState();
  const navigate = useNavigate();
  const isLogin = mode === "login";

  let schema = yup.object().shape({
    name: yup.string().trim().required("Please type your name."),
    email: yup.string().trim().email("Invalid email.").required("Please type your email address."),
    password: yup
      .string()
      .trim()
      .min(10, "Password is too short.")
      .required("Please choose a password."),
  });

  if (isLogin) {
    schema = yup.object().shape({
      email: yup
        .string()
        .trim()
        .email("Invalid email.")
        .required("Please type your email address."),
      password: yup
        .string()
        .trim()
        .min(10, "Password is too short.")
        .required("Please choose a password."),
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  async function submitHandler(values) {
    let authData = {
      email: values.email,
      password: values.password,
    };
    let mode = "login";

    if (!isLogin) {
      authData.name = values.name;
      mode = "register";
    }

    const response = await fetch("http://localhost:4000/" + mode, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    if (
      response.status === 401 ||
      response.status === 404 ||
      response.status === 422 ||
      response.status === 409
    ) {
      const resData = await response.json();
      return setAuthError(resData.message);
    }

    if (!response.ok) return setAuthError("Could not authenticate user.");

    const resData = await response.json();
    const token = resData.token;

    sessionStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    sessionStorage.setItem("expiration", expiration.toISOString());

    navigate("/");
    return navigate(0);
  }

  return (
    <>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {authError && <p style={{ textAlign: "center" }}>{authError}</p>}
      <Form noValidate method="post" onSubmit={handleSubmit(submitHandler)}>
        <Row className="justify-content-md-center">
          <Col lg={6} xl={4}>
            {!isLogin && (
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  isInvalid={!!errors.name}
                  {...register("name")}
                ></Form.Control>
                <p className="errors">{errors.name?.message}</p>
              </Form.Group>
            )}
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
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                isInvalid={!!errors.password}
                {...register("password")}
              ></Form.Control>
              <p className="errors">{errors.password?.message}</p>
            </Form.Group>
            <Form.Group className="float-end">
              <Button className="ms-3" variant="primary" type="submit">
                {isLogin ? "Login" : "Register"}
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default AuthForm;
