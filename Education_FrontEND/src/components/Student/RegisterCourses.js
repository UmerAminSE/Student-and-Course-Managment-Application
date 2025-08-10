import Container from 'react-bootstrap/Container';
import './stcss.css'
import Navbar from 'react-bootstrap/Navbar';
import ico from '../Images/appIcon.jpg'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl  from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import  Dropdown  from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

export default function RegisterNewCourses() 
{ 
    const mycback = useNavigate();
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
                    
                    <Button  className="nav-button">Dashboard</Button>{' '}
                    <Button className="nav-button">My Courses</Button>
                <Button  className="nav-button">Register Courses</Button>
                </Navbar.Brand>
               
                <Button onClick={() => mycback('/student')}  variant="outline-danger" size="lg">Back</Button>{' '}


            </Container>
        </Navbar >
        <Container className="mt-3" >
        <Row>
        <Col xs={8}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search for courses"
              aria-label="Search for courses"
              aria-describedby="basic-addon2"
            />
            <Button variant="secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </Col>
        
      </Row>
      <Row>
        <Col>
          <Card border="primary" style={{ width: '18rem' }}>
          <Card.Header style={{ background: 'linear-gradient(to left,  silver, black)' ,color:'white'}}></Card.Header>
            
            <Card.Body>
              <Card.Title>Introduction to IoT</Card.Title>
              <Card.Text>
               
              </Card.Text>
            </Card.Body>
            <Button  variant="success" style={{color:'white'}}>Request Registeration</Button>
          </Card>
        </Col>
        <Col>
          <Card border="primary" style={{ width: '18rem' }}>
            <Card.Header style={{ background: 'linear-gradient(to left, silver, black)' ,color:'white' }}></Card.Header>
            
            <Card.Body>
              <Card.Title>Deep Learning</Card.Title>
              <Card.Text>
                
              </Card.Text>
            </Card.Body>
            <Button variant="success" style={{color:'white'}}>Request Registeration</Button>
          </Card>
        </Col>
        <Col>
          <Card border="primary" style={{ width: '18rem' }}>
          <Card.Header style={{ background: 'linear-gradient(to left,  silver, black)' ,color:'white' }}></Card.Header>
           
            <Card.Body>
              <Card.Title>Linear Algebra</Card.Title>
              
            </Card.Body>
            <Button  variant="secondary" style={{color:'white'}}>Registeration closed</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  </>
);
}