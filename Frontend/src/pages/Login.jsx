import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      return toast.error('Email and password are required');
    }

    try {
      const url = "http://localhost:5000/auth/login";

      const response = await axios.post(url, loginInfo);

      const { success, message, name, jwtToken } = response.data;

      if (success) {
        toast.success("Login successfully");

        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);

        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        toast.error(message);
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Card className="shadow p-4" style={{ width: '400px' }}>
            <Card.Body>
              <h3 className="text-center mb-4">Login</h3>

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={loginInfo.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={loginInfo.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>

              <div className="text-center mt-3">
                Don't have an account?{' '}
                <Link to="/signup">Signup</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastContainer />
    </Container>
  );
};

export default Login;
