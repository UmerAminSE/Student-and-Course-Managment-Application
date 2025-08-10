import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import StudentsidePage from './pages/StudentsidePage';
import TeachersidePage from './pages/TeachersidePage';
import CreatecoursePage from './pages/CreatecoursePage'; // Assuming this imports the NewCourseCreation component
import LoginPage from './pages/LoginPage';
import ViewallCoursespage from './pages/ViewallCouresepage';
import CurrentcoursesPage from './pages/CurrentcoursesPage';
import RegisterCoursePage from './pages/RegisterCoursePage';
import CourseDetailPage from './pages/CourseDetailPage';
import EditCoursePage from './pages/EditCoursePage';
import NewStudentpage from './pages/NewStudentpage';
import ViewAllstdpage from './pages/ViewAllstdpage';
import EditstudentPage from './pages/EditstudentPage';
import TeacherContentPage from './pages/TeacherCourseContentPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "student",
    element: <StudentsidePage />,
  },
  {
    path: "teacher",
    element: <TeachersidePage />,
  },
  {
    path: "teachercreatecourse",
    element: <CreatecoursePage />, // Ensure this path correctly points to the NewCourseCreation component
  },
  {
    path: "loginpage",
    element: <LoginPage />,
  },
  {
    path: "studentallcourse",
    element: <ViewallCoursespage />,
  },
  {
    path: "currentCourses",
    element: <CurrentcoursesPage />,
  },
  {
    path: "RegisterCourses",
    element: <RegisterCoursePage />,
  },
  {
    path: "ViewCourse",
    element: <CourseDetailPage />,
  },
  {
    path: "editCourse",
    element: <EditCoursePage />,
  },
  {
    path: "newstudent",
    element: <NewStudentpage />,
  },
  {
    path: "viewallstudent",
    element: <ViewAllstdpage />,
  },
  {
    path: "editstudent/:studentId",
    element: <EditstudentPage />,
  },
  {
    path: "teachercontentView",
    element: <TeacherContentPage />,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
