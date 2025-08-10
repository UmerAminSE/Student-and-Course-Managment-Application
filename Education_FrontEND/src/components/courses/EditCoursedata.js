import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import apiService from '../../apiService';

const EditCoursesForm = ({ onSubmit }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const courseData = location.state?.courseData;
    const [courses, setCourses] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [participantCount, setParticipantCount] = useState('');
    const [error, setError] = useState(null);
    const [filteredCourses, setFilteredCourses] = useState([]);
    useEffect(() => {
        if (courseData) {
            setCourseName(courseData.course_name || '');
            setStartDate(courseData.start_date || '');
            setEndDate(courseData.end_date || '');
            setParticipantCount(courseData.number_of_participants || '');
        }
    }, [courseData]);

   /*  const handleSubmit = async (event) => {
       
        } */

        const updatedCourseData = {
            course_id: courseData.id,
            course_name: courseName,
            start_date: startDate,
            end_date: endDate,
            number_of_participants: participantCount
        };
        const handleUpdateCourse = async (event) => {
          event.preventDefault();

            if (!courseData) {
                setError('Course data is not available.');
                return;
            }
            try {
                const response = await apiService.put('courses/put', updatedCourseData.course_id, updatedCourseData);
                if (response.status === 200) {
                    setCourses(courses.map(course => 
                        course.id === updatedCourseData.course_id ? { ...course, ...updatedCourseData } : course
                    ));
                    setFilteredCourses(filteredCourses.map(course => 
                        course.id === updatedCourseData.course_id ? { ...course, ...updatedCourseData } : course
                    ));
                    navigate('/currentCourses');
                } else {
                    setError(`Failed to update course: ${response.statusText}`);
                }
            } catch (error) {
                setError(`Error: ${error.message}`);
            }
        };
        /* try {
            await onSubmit(updatedCourseData);
            navigate('/currentCourses'); // Navigate back after successful submission
        } catch (error) {
            setError(`Error: ${error.message}`);
        } */
   

    if (!courseData) {
        return <Alert variant="danger">Course data is not available.</Alert>;
    }

    return (
        <Container>
            <h2>Edit Course</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form >
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formCourseName">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter course name"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formStartDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formEndDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formParticipantCount">
                        <Form.Label>Number of Participants</Form.Label>
                        <Form.Control
                            type="number"
                            value={participantCount}
                            onChange={(e) => setParticipantCount(e.target.value)}
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Button variant="primary" type="submit" onClick={handleUpdateCourse}>
                            Update
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="danger" onClick={() => navigate('/currentCourses')}>
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );

};
export default EditCoursesForm;
