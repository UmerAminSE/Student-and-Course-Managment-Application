import '../courses/newcourse.css';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import ico from '../Images/appIcon.jpg';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Form } from 'react-bootstrap';
import apiService from '../../apiService'; // Import the apiService

export default function NewStudentCreation() {
    const navigate = useNavigate();

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [degree, setDegree] = useState('');
    const [program, setProgram] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setDegree('');
        setProgram('');
        setEmail('');
        setAge('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Check if all fields are filled
        if (!first_name || !last_name || !degree || !program || !email || !age) {
            setError('All fields are required');
            setTimeout(() => {
                setError(null);
            }, 2000); 
            return;
        }

        try {
            const newStudentData = {
                first_name,
                last_name,
                degree,
                program,
                email,
                age
            };

            const postResponse = await apiService.post('students', newStudentData);

            if (postResponse.status === 201 || postResponse.status === 200) {
                setSuccess('Student created successfully');
                resetForm();

                setTimeout(() => {
                    setSuccess(null);
                }, 3000); // Clear success message after 3 seconds
            } else {
                setError(`Failed to create student: ${postResponse.statusText}`);
            }
        } catch (error) {
            setError(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container fluid className="justify-content-left">
                    <Navbar.Brand style={{ paddingRight: '1cm', color: 'darkblue' }}>
                        <img alt="" src={ico} width="30" height="30" className="d-inline-block align-top" />{' '}
                        
                        <Button onClick={() => navigate('/teacher')} className="nav-button">Dashboard</Button>{' '}
                        <Button onClick={() => navigate('/teachercreatestudent')} className="nav-button">Create Student</Button>
                    </Navbar.Brand>
                    <Nav className="ml-3"></Nav>
                </Container>
            </Navbar>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <div >
                <Container className="mt-6">
                    <h2>Create New Student</h2>
                    
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter first name" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter last name" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formDegree">
                                <Form.Label>Degree</Form.Label>
                                <Form.Control type="text" placeholder="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formProgram">
                                <Form.Label>Program</Form.Label>
                                <Form.Control type="text" placeholder="Program" value={program} onChange={(e) => setProgram(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" placeholder="Enter age" value={age} onChange={(e) => setAge(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <div className='formButton'>
                            <Row className="mb-3">
                                <Button as={Col} variant="primary" type="submit" onClick={handleSubmit}>
                                    Submit
                                </Button>
                                <Button as={Col} variant="danger" onClick={() => navigate('/teacher')} className='formButton'>
                                    Back
                                </Button>
                            </Row>
                        </div>
                    </Form>
                </Container>
            </div>
        </>
    );
}
