import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const Home = () => {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [product, setProduct] = useState([]);

    const navigate = useNavigate();
    const baseURL = 'http://localhost:5000/products';

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');

        toast.success('Logout Successfully!', {
            position: "top-center",
        });

        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const res = await axios.get(baseURL, {
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            });

            setProduct(res.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container className="mt-5 text-center">
            <div className="mb-4 align-items-center">
                <div>
                    <h2 className="fw-bold">Welcome, {loggedInUser}</h2>
                </div>
                <div className="text-center">
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>

            <div className="text-center">
                {product.map((item) => (
                    <div md={4} className="mb-4" key={item._id}>
                        <Card className="shadow-sm w-50 p-3">
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    Price: ₹{item.price}
                                </Card.Text>
                                <Button variant="primary" size="sm">
                                    Buy Now
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </Container>
    );
};

export default Home;
