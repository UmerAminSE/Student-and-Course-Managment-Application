import './newcourse.css';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import ico from '../Images/appIcon.jpg';
import React, { useState} from 'react';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button, Form } from 'react-bootstrap';
import apiService from '../../apiService'; // Import the apiService

export default function NewCourseCreation() {
    const courseCreate = useNavigate();
    const dashboard = useNavigate();

    const navigate = useNavigate();

    const [course_name, setCourseName] = useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [number_of_participants, setParticipantCount] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    const resetForm = () => {
        setCourseName('');
        setStartDate('');
        setEndDate('');
        setParticipantCount('');
    };

    const handleSubmit = async (event) => {
            
        
        event.preventDefault();
          // Check if all fields are filled
          if (!course_name || !start_date || !end_date || !number_of_participants) {
            setError('All fields are required');
            setTimeout(() => {
                setError(null);
            }, 2000); 
            return;
        }

        if (new Date(end_date) < new Date(start_date)) {
            setError('End date should not be earlier than start date');
            setTimeout(() => {
                setError(null);
            }, 2000); 
            resetForm(setEndDate)
            return;
        }

        try {
            // Check if course with the same name already exists
            const response = await apiService.get('courses');
            const existingCourses = response.data; // Assume response.data is the list of courses

            if (Array.isArray(existingCourses) && existingCourses.some(course => course.course_name === course_name)) {
                setError('Course with the same name already exists');
                setTimeout(() => {
                    setError(null);
                }, 3000); 

                return;
            }

            const newCourseData = {
                course_name,
                start_date,
                end_date,
                number_of_participants
            };

            const postResponse = await apiService.post('courses', newCourseData);

            if (postResponse.status === 201 || postResponse.status === 200) {
                setSuccess('Course created successfully');
                resetForm();

                setTimeout(() => {
                    setSuccess(null);
                }, 3000); // Clear success message after 5 seconds
            } else {
                setError(`Failed to create course: ${postResponse.statusText}`);
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
                        
                        <Button onClick={() => dashboard('/teacher')} className="nav-button">Dashboard</Button>{' '}
                        <Button onClick={() => courseCreate('/teachercreatecourse')} className="nav-button">Create Course</Button>
                    </Navbar.Brand>
                    <Nav className="ml-3"></Nav>
                </Container>
            </Navbar>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <div className='course-form'>
                <Container className="mt-6">
                    <h2>Create new course</h2>
                    
                    <Form
                     onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Course Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter course name" value={course_name} onChange={(e) => setCourseName(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formDate">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="date" value={start_date} onChange={(e) => setStartDate(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control type="date" value={end_date} onChange={(e) => setEndDate(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Number of Participants</Form.Label>
                                <Form.Control type="number" value={number_of_participants} onChange={(e) => setParticipantCount(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <div className='formButton'>
                            <Row className="mb-3">
                                <Button as={Col} variant="primary" type="submit" onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                                <Button as={Col} variant="danger" onClick={() => dashboard('/teacher')} className='formButton'>
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
