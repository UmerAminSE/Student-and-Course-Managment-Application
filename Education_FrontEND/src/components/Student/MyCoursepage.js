import React, { useState } from 'react';
import ico from '../Images/appIcon.jpg';
import { Navbar, Container, Button, Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function MyCoursesPage ()  {
    const mycback = useNavigate();
    const [selectedCourseName, setSelectedCourseName] = useState(false);
    const [lectureFiles, setLectureFiles] = useState([]); // State to store lecture files
    const [assignmentFiles, setAssignmentFiles] = useState([]); // State to store assignment files
    const [selectedFileContent, setSelectedFileContent] = useState(''); // State to store selected file content

    const handleUploadLecture = (event) => {
        const files = event.target.files; // Get the selected files
        const newFiles = Array.from(files).map((file) => ({
            name: file.name,
            content: URL.createObjectURL(file), // Store the file content
        }));
        setLectureFiles([...lectureFiles, ...newFiles]); // Store the selected files in state
    };

    const handleUploadAssignment = (event) => {
        const files = event.target.files; // Get the selected files
        const newFiles = Array.from(files).map((file) => ({
            name: file.name,
            content: URL.createObjectURL(file), // Store the file content
        }));
        setAssignmentFiles([...assignmentFiles, ...newFiles]); // Store the selected files in state
    };

    const handlePreviewClick = (content) => {
        setSelectedFileContent(content); // Set the selected file content
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
                        
                        <Button className="nav-button" onClick={() => mycback('/student')}>Dashboard</Button>{' '}
                        <Button className="nav-button" onClick={() => mycback('/studentallcourse')}>My Courses</Button>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Container className="mt-3">
                <h3>{selectedCourseName}</h3>
                <Tabs defaultActiveKey="lectures">
                    <Tab eventKey="lectures" title="Lectures">
                        <div className="d-flex">
                            {/* Left side: File list */}
                            <div className="mr-3" style={{ flex: 1 }}>
                                <h2>Lecture Files</h2>
                                {/* List of uploaded lecture files */}
                                <ul>
                                    {lectureFiles.map((file, index) => (
                                        <li key={index}>
                                            {file.name}
                                            {/* Preview button */}
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="ml-2"
                                                onClick={() => handlePreviewClick(file.content)}>
                                                Preview
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Right side: File content */}
                            <div style={{ flex: 2 }}>
                                <h2></h2>
                                {/* Display the selected file content */}
                                <iframe title="File Preview" src={selectedFileContent} width="100%" height="500px"></iframe>
                            </div>
                        </div>
                        {/* Add input for lecture file upload */}
                        <input type="file" accept=".pdf" multiple onChange={handleUploadLecture} />
                    </Tab>
                    <Tab eventKey="assignments" title="Assignments">
                        <div className="d-flex">
                            {/* Left side: Assignment list */}
                            <div className="mr-3" style={{ flex: 1 }}>
                                <h2>Assignment Files</h2>
                                {/* List of uploaded assignment files */}
                                <ul>
                                    {assignmentFiles.map((file, index) => (
                                        <li key={index}>
                                            {file.name}
                                            {/* Preview button */}
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="ml-2"
                                                onClick={() => handlePreviewClick(file.content)}>
                                                Preview
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Right side: Assignment content */}
                            <div style={{ flex: 2 }}>
                                <h2></h2>
                                {/* Display the selected file content */}
                                <iframe title="Assignment Preview" src={selectedFileContent} width="100%" height="500px"></iframe>
                            </div>
                        </div>
                        {/* Add input for assignment file upload */}
                        <input type="file" accept=".pdf" multiple onChange={handleUploadAssignment} />
                    </Tab>
                </Tabs>
            </Container>
        </>
    );
}
