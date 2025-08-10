package com.project1.education.course;

import com.project1.education.assignment.Assignment;
import com.project1.education.assignment.AssignmentRepository;
import com.project1.education.assignment.AssignmentRequest;
import com.project1.education.exception.*;
import com.project1.education.grade.Grade;
import com.project1.education.grade.GradeId;
import com.project1.education.grade.GradeRepository;
import com.project1.education.grade.GradeRequest;
import com.project1.education.student.Student;
import com.project1.education.student.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public void create_course(Course course) {
        courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(int id) {
        return courseRepository.findById(id);
    }

    public void updateCourse(int courseId, Course updatedCourse) {
        if (courseRepository.existsById(courseId)) {
            updatedCourse.setCourse_id(courseId);
            courseRepository.save(updatedCourse);

        }

    }

    public void deleteCourse(int courseId) {
        if(courseRepository.existsById(courseId)) {
            courseRepository.deleteById(courseId);
        } else {
            throw new ResourseNotFoundException("Student was not found");
        }
    }
}