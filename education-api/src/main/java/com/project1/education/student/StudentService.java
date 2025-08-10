package com.project1.education.student;

import com.project1.education.course.Course;
import com.project1.education.exception.ResourseNotFoundException;
import com.project1.education.exception.StudentAlreadyExistsException;
import com.project1.education.grade.Grade;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    StudentRepository studentRepository;

    public Student saveStudent(Student student) {
        studentRepository.save(student);

        return student;
    }
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(int StudentId) {
        return studentRepository.findById(StudentId);
    }


    public void updateStudent(int studentId, Student updatedStudent) {
        if (studentRepository.existsById(studentId)) {
            updatedStudent.setStudent_id(studentId);
            studentRepository.save(updatedStudent);

        }

    }
    public void deleteStudent(int studentId) {
        if(studentRepository.existsById(studentId)) {
            studentRepository.deleteById(studentId);
        } else {
            throw new ResourseNotFoundException("Student was not found");
        }
    }


}
