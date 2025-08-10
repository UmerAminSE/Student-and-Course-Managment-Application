import Container from 'react-bootstrap/Container';
import './teacherheader.css'
import Navbar from 'react-bootstrap/Navbar';
import ico from '../Images/appIcon.jpg'
import Button from 'react-bootstrap/Button';

import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function TeacherappHeader() 
{
    const crtcourse= useNavigate();
    const tback= useNavigate();
    const teacher_dashboard= useNavigate();
    const tcurrentcourses= useNavigate();

    return(
       <><Navbar expand="lg" className="bg-body-tertiary">
            <Container className="justify-content-left">
                <Navbar.Brand style={{ color: 'darkblue' }}>
                    <img
                        alt=""
                        src={ico}
                        width="30"
                        height="30"
                        className="d-inline-block align-top" />{' '}
                    Teacher Side
                    
                    <Button onClick={() => teacher_dashboard('/teacher')} className="nav-button">Dashboard</Button>{' '}
                </Navbar.Brand>
               
                <Button onClick={()=>tback("/loginpage")} variant="outline-danger" size="lg">Back</Button>{' '}


            </Container>
        </Navbar >
       
        <div className="nav-wrapper">
            <Nav className="flex-column">
                <Button onClick={()=>crtcourse("/teachercreatecourse")}  className="nav-button">Create Course</Button>
                <Button onClick={()=>tcurrentcourses("/currentCourses")}  className="nav-button">Current Courses</Button>
                
                <Button eventKey="link-1" className="nav-button" onClick={()=>tcurrentcourses("/viewallstudent")}>View Students</Button>
                <Button onClick={()=>tcurrentcourses("/newstudent")}  className="nav-button">Add new Student</Button>
            </Nav>
        </div>
            </>
        
            
    )

}