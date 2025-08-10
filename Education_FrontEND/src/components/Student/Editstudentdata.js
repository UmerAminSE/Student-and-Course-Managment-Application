import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const EditStudentForm = ({ studentData, onSubmit, onCancel }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [degree, setDegree] = useState('');
    const [program, setProgram] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (studentData) {
            setFirstName(studentData.first_name);
            setLastName(studentData.last_name);
            setDegree(studentData.degree);
            setProgram(studentData.program);
            setEmail(studentData.email);
            setAge(studentData.age);
        }
    }, [studentData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedStudentData = {
            student_id: studentData.id,
            first_name: firstName,
            last_name: lastName,
            degree: degree,
            program: program,
            email: email,
            age: age
        };

        try {
            await onSubmit(updatedStudentData);
        } catch (error) {
            setError(`Error: ${error.message}`);
        }
    };

    return (
        <Container>
            <h2>Edit Student</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formDegree">
                        <Form.Label>Degree</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter degree"
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formProgram">
                        <Form.Label>Program</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter program"
                            value={program}
                            onChange={(e) => setProgram(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default EditStudentForm;
