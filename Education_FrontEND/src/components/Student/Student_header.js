import Container from 'react-bootstrap/Container';
import './stcss.css'
import Navbar from 'react-bootstrap/Navbar';
import ico from '../Images/appIcon.jpg'
import Button from 'react-bootstrap/Button';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function StudentappHeader() 
{ 
    const rgstrcourses=useNavigate();
    const back = useNavigate();
    const student_dashboard= useNavigate();
    const myallcourses= useNavigate();
    return(
       <><Navbar bg="light" data-bs-theme="light">
            <Container className="justify-content-left">
                <Navbar.Brand style={{ color: 'darkblue' }}>
                    <img
                        alt=""
                        src={ico}
                        width="30"
                        height="30"
                        className="d-inline-block align-top" />{' '}
                    CMA - Student
                    <Button onClick={() => student_dashboard('/student')} className="nav-button">Dashboard</Button>{' '}
                    
                </Navbar.Brand>
               
                <Button onClick={()=>back("/loginpage")} variant="outline-danger" size="lg">Back</Button>{' '}


            </Container>
        </Navbar >
       
        <div className="nav-wrapper">
            <Nav className="flex-column">
                <Button onClick={() => myallcourses('/studentallcourse')} className="nav-button">My Courses</Button>
                <Button onClick={() => rgstrcourses('/Registercourses')} className="nav-button">Register Courses</Button>
            </Nav>
        </div>
            </>
        
            
    );

}