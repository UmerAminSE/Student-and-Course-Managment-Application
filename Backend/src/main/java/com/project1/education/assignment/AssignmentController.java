package com.project1.education.assignment;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("assignments")
@Tag(name = "Assignment")
@CrossOrigin(origins = "http://localhost:3000")
public class AssignmentController {
    private final AssignmentService assignmentService;

    // get all assignments
    @GetMapping("")
    public ResponseEntity<List<Assignment>> getAllAssignments() {
        return ResponseEntity.ok(assignmentService.getAllAssignments());
    }

    // get an assignment by its ID
    @GetMapping("{id}")
    public ResponseEntity<Assignment> getAssignmentById(@PathVariable("id") Integer assignmentId) {
        return ResponseEntity.ok(assignmentService.getAssignmentById(assignmentId));
    }

    // create a new assignment with file upload
    @PostMapping("")
    public ResponseEntity<Assignment> createAssignment(@RequestParam("file") MultipartFile file,
                                                       @RequestBody AssignmentRequest assignmentRequest) {
        Assignment assignment = assignmentService.createAssignment(assignmentRequest, file);
        return new ResponseEntity<>(assignment, HttpStatus.CREATED);
    }

    // update an existing assignment
    @PutMapping("{id}")
    public ResponseEntity<Assignment> updateAssignment(@PathVariable("id") Integer assignmentId,
                                                       @RequestBody Assignment assignment) {
        Assignment updatedAssignment = assignmentService.updateAssignment(assignmentId, assignment);
        return ResponseEntity.ok(updatedAssignment);
    }

    // delete an assignment by its ID
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable("id") Integer assignmentId) {
        assignmentService.deleteAssignment(assignmentId);
        return ResponseEntity.noContent().build();
    }
}
