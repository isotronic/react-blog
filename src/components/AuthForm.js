import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { json } from "react-router-dom";

function AuthForm({ mode }) {
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

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  function submitHandler(values) {
    return;
  }

  return (
    <>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <Formik validationSchema={schema} onSubmit={submitHandler} initialValues={initialValues}>
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate method="post" onSubmit={handleSubmit}>
            <Row className="justify-content-md-center">
              <Col lg={6} xl={4}>
                {!isLogin && (
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={!!errors.name}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>
                )}
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="float-end">
                  <Button className="ms-3" variant="primary" type="submit">
                    {isLogin ? "Login" : "Register"}
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

export default AuthForm;
