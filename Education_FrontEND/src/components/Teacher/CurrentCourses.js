import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown'; // Import Dropdown component
import ico from '../Images/appIcon.jpg';
import { useNavigate } from 'react-router-dom';
import apiService from '../../apiService'; 

export default function ViewCurrentCourses() {
    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await apiService.get('courses');
                if (response.status === 200) {
                    setCourses(response.data);
                    setFilteredCourses(response.data);
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

    const handleEditCourse = (course) => {
        navigate('/editCourse', { state: { courseData: course } });
    };

    const handleDeleteCourse = async (courseId) => {
        if (!courseId) {
            setError("Course ID is required.");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (!confirmDelete) {
            return; // If user cancels, do nothing
        }

        try {
            const response = await apiService.delete(`courses/delete`, courseId.toString());
            if (response.status === 200) {
                setCourses(courses.filter(course => course.id !== courseId));
                setFilteredCourses(filteredCourses.filter(course => course.id !== courseId));
            } else {
                setError(`Failed to delete course: ${response.statusText}`);
            }
        } catch (error) {
            setError(`Error: ${error.message}`);
        }
    };

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        if (term === '') {
            setFilteredCourses(courses);
        } else {
            setFilteredCourses(courses.filter(course => 
                course.course_name.toLowerCase().includes(term)
            ));
        }
    };

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
                       
                        <Button onClick={() => navigate('/teacher')} className="nav-button">Dashboard</Button>{' '}
                    </Navbar.Brand>
                    <Button onClick={() => navigate('/teacher')} variant="outline-danger" size="lg">Back</Button>{' '}
                </Container>
            </Navbar>

            <Container className="mt-3" >
                <h3></h3>
                <Form.Control 
                    type="text" 
                    placeholder="Search courses by name..." 
                    value={searchTerm}
                    onChange={handleSearch}
                    className="mb-3"
                />
                {error && <Alert variant="danger">{error}</Alert>}
                {loading && <p>Loading courses...</p>}
                {!loading && filteredCourses.length === 0 && <p>No courses available</p>}
                <Row>
                    {filteredCourses.map(course => (
                        <Col key={course.id} md={4} className="mb-3">
                            <Card 

                                border="primary"
                                style={{ width: '18rem' }}
                                className={`h-100 ${selectedCourse && selectedCourse.id === course.id ? 'border-primary' : ''}`} 
                                onClick={() => handleCourseSelect(course)}>
                                    <Card.Header style={{ background: 'linear-gradient(to left, grey, black)', color: 'white' }}>
                                {course.course_name}
                                <Dropdown className="position-absolute top-0 end-0" variant="primary"> {/* Align to the right */}
                                        <Dropdown.Toggle variant="danger" id={`dropdown-${course.id}`}>
                                            <span>&#8942;</span> {/* Three dots symbol */}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleEditCourse(course)}>Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDeleteCourse(course.course_id)}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Card.Header>
                                <Card.Body>
                                
                                    <Card.Title></Card.Title>
                                    <Card.Text>
                                        Start Date: {course.start_date}
                                        <br />
                                        End Date: {course.end_date}
                                        <br />
                                        Participants: {course.number_of_participants}
                                    </Card.Text>
                                    
                                    
                                    
                                </Card.Body>
                                <Button variant="outline-success" onClick={() =>navigate('/teachercontentView')}>Course Content</Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}
