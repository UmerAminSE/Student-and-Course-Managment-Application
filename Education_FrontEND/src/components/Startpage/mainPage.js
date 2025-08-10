import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';

import './mainpageButtonContainer.css'
import ico from '../Images/appIcon.jpg'
import Navbar from 'react-bootstrap/Navbar';

import StudentappHeader from '../Student/Student_header'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function AppmainPage(){

    const StudentNav = useNavigate();
    const teacherNav= useNavigate();

  
    return(
        <div>
             <Navbar bg="light" data-bs-theme="light">
               <Container>
                    <Navbar.Brand style={{ color: 'darkblue' }} >
                        <img
                        alt=""
                        src={ico}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                 />{' '} 
                 Course Management Application
                 </Navbar.Brand>
              </Container>
         </Navbar>  
         <Container className='custom-container'>
                                     
             
        
           
         
         <section >
           
             <div className='customsection1'>
                
                                
                      <h2 className='customheading-mainpage'>Continue As</h2>
                     <div className="mb-2">
                         <Button onClick={()=>StudentNav("/student")} variant="outline-primary" size="lg">Student</Button>{' '} 
                         <br />
                         <br />
                         <Button onClick={()=>teacherNav("/teacher")} variant="outline-danger" size="lg">Teacher</Button>{' '}
                      </div>
                     
                  
             </div>
         </section>
         </Container>
        </div>
    );


}