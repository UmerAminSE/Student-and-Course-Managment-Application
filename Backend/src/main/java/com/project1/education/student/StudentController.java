package com.project1.education.student;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class StudentController {

    @Autowired
    private StudentService studentServices;

    // Create a new student
    @PostMapping("")
    public ResponseEntity<String> add(@RequestBody Student student) {
        studentServices.saveStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body("New student saved");
    }

    // Get a list of all students
    @GetMapping("")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentServices.getAllStudents();
        return ResponseEntity.ok(students);
    }

    // Get a specific student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id) {
        Optional<Student> student = studentServices.getStudentById(id);
        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Update an existing student
    @PutMapping("/put/{student_id}")
    public ResponseEntity<String> update(@PathVariable("student_id") int studentId, @RequestBody Student updatedStudent) {
        studentServices.updateStudent(studentId, updatedStudent);
        return ResponseEntity.status(HttpStatus.CREATED).body("Student updated");
    }

    // Delete a student
    @DeleteMapping("/delete/{student_id}")
    public ResponseEntity<String> remove(@PathVariable("student_id") int studentId) {
        studentServices.deleteStudent(studentId);
        return ResponseEntity.status(HttpStatus.OK).body("Student deleted");
    }
}