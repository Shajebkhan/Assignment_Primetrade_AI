import axios from 'axios';
import { useState } from 'react';
import React from 'react'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();

    const [SignupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        const { name, email, password } = SignupInfo;

        if (!name || !email || !password) {
            return toast.error('Please fill all the inputs');
        }

        try {
            const URL = 'http://localhost:5000/auth/signup';

            const res = await axios.post(URL, SignupInfo);

            const { success, message } = res.data;

            if (success) {
                toast.success('Signup successfully');

                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                toast.error(message || 'Signup failed');
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col>
                    <Card className="shadow p-4" style={{ width: '420px' }}>
                        <Card.Body>
                            <h3 className="text-center mb-4">Create Account</h3>

                            <Form onSubmit={handleSignup}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        placeholder="Enter your name"
                                        value={SignupInfo.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={SignupInfo.email}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={SignupInfo.password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Button variant="success" type="submit" className="w-100">
                                    Sign Up
                                </Button>
                            </Form>

                            <div className="text-center mt-3">
                                Already have an account?{' '}
                                <Link to="/login">Login</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <ToastContainer />
        </Container>
    );
};

export default Signup;
