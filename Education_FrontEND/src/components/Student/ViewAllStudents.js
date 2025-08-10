import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import ico from '../Images/appIcon.jpg';
import { useNavigate } from 'react-router-dom';
import apiService from '../../apiService'; // Import the apiService

export default function ViewCurrentStudents() {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await apiService.get('students');
                if (response.status === 200) {
                    setStudents(response.data);
                    setFilteredStudents(response.data);
                } else {
                    setError(`Failed to fetch students: ${response.statusText}`);
                }
            } catch (error) {
                setError(`Error: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    const handleEditStudent = (studentId) => {
        navigate(`/editStudent/${studentId}`);
    };

    const handleDeleteStudent = async (studentId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (!confirmDelete) {
            return; // If user cancels, do nothing
        }

        try {
            const response = await apiService.delete('students/delete', studentId.toString());
            if (response.status === 200) {
                setStudents(students.filter(student => student.student_id!== studentId));
                setFilteredStudents(filteredStudents.filter(student => student.student_id !== studentId));
            } else {
                setError(`Failed to delete student: ${response.statusText}`);
            }
        } catch (error) {
            setError(`Error: ${error.message}`);
        }
    };

    
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setFilteredStudents(students);
        } else {
            const lowercasedSearchTerm = event.target.value.toLowerCase();
            setFilteredStudents(students.filter(student => 
                student.first_name.toLowerCase().includes(lowercasedSearchTerm) ||
                student.last_name.toLowerCase().includes(lowercasedSearchTerm) ||
                student.degree.toLowerCase().includes(lowercasedSearchTerm) ||
                student.program.toLowerCase().includes(lowercasedSearchTerm)
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

            <Container className="mt-3">
                <h3>All Students</h3>
                <Form.Control 
                    type="text" 
                    placeholder="Search students..." 
                    value={searchTerm}
                    onChange={handleSearch}
                    className="mb-3"
                />
                {error && <Alert variant="danger">{error}</Alert>}
                {loading && <p>Loading students...</p>}
                {!loading && filteredStudents.length === 0 && <p>No students available</p>}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Degree</th>
                            <th>Program</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => (
                            <tr key={student.id}>
                                <td>{student.first_name} {student.last_name}</td>
                                <td>{student.degree}</td>
                                <td>{student.program}</td>
                                <td>{student.email}</td>
                                <td>{student.age}</td>
                                <td>
                                    <Button variant="primary" onClick={() => handleEditStudent(student.student_id)}>Edit</Button>{' '}
                                    <Button variant="danger" onClick={() => handleDeleteStudent(student.student_id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}
