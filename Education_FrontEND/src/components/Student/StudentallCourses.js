import Container from 'react-bootstrap/Container';
import './stcss.css';
import Navbar from 'react-bootstrap/Navbar';
import ico from '../Images/appIcon.jpg';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import apiService from '../../apiService';

export default function StudentAllcoursesView() {
    const mycback = useNavigate();
    const vcourses = useNavigate();

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiService.get('courses');
                if (response.status === 200) {
                    setCourses(response.data);
                } else {
                    setError(`Failed to fetch courses: ${response.statusText}`);
                }
            } catch (error) {
                setError(`Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseSelect = (course) => {
        setSelectedCourse(course);
    };

    const handleViewCourseContent = (courseName) => {
        vcourses("/ViewCourse", { state: { courseName: courseName } }); 
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredCourses = courses.filter(course =>
        course.course_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container className="justify-content-left">
                    <Navbar.Brand style={{ color: 'darkblue' }}>
                        <img
                            alt=""
                            src={ico}
                            width="30"
                            height="30"
                            className="d-inline-block align-top" />{' '}
                        
                        <Button className="nav-button">Dashboard</Button>{' '}
                    </Navbar.Brand>

                    <Button onClick={() => mycback('/student')} variant="outline-danger" size="lg">Back</Button>{' '}
                </Container>
            </Navbar>
            <br />
            <h2></h2>
            <br />
            <Container className="mt-3">
                <Form.Control
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <br />
                <Row>
                    {filteredCourses.map(course => (
                        <Col key={course.id} md={4} className="mb-3">
                            <Card
                                border="primary"
                                style={{ width: '18rem' }}
                                className={`h-100 ${selectedCourse && selectedCourse.id === course.id ? 'border-primary' : ''}`}
                                onClick={() => handleCourseSelect(course)}
                            >
                                <Card.Header style={{ background: 'linear-gradient(to left, #33ccff, black)', color: 'white' }}>
                                    {course.course_name}
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title></Card.Title>
                                    <Card.Text>
                                        Start Date: {course.start_date}
                                        <br />
                                        End Date: {course.end_date}
                                    </Card.Text>
                                </Card.Body>
                                <Button variant="primary" onClick={() => handleViewCourseContent(course.course_name)}>View Content</Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
