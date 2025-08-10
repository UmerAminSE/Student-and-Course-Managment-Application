package com.project1.education.course;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class CourseController {

    @Autowired
    private final CourseService courseService;

    // Create a new course
    @PostMapping("")
    public ResponseEntity<String> add(@RequestBody Course course) {
        courseService.create_course(course);
        return ResponseEntity.status(HttpStatus.CREATED).body("New course saved");
    }

    // Get a list of all courses
    @GetMapping("")
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        return ResponseEntity.ok(courses);
    }

    // Get a specific course by ID
    @GetMapping("/{course_id}")
    public ResponseEntity<Course> getCourseById(@PathVariable("course_id") int courseId) {
        Optional<Course> course = courseService.getCourseById(courseId);
        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Update an existing course
    @PutMapping("/put/{course_id}")
    public ResponseEntity<String> update(@PathVariable("course_id") int courseId, @RequestBody Course updatedCourse) {
        courseService.updateCourse(courseId, updatedCourse);
        return ResponseEntity.status(HttpStatus.CREATED).body("course updated");

    }

    // Delete a course
    @DeleteMapping("/delete/{course_id}")
    public String remove(@PathVariable("course_id") int courseId) {
        courseService.deleteCourse(courseId);


        return "Course deleted";
    }

}