package com.project1.education.assignment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;

    @Autowired
    public AssignmentService(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Assignment getAssignmentById(Integer assignmentId) {
        return assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Assignment not found with id " + assignmentId));
    }

    public Assignment createAssignment(AssignmentRequest assignmentRequest, MultipartFile file) {
        Assignment assignment = new Assignment();
        assignment.setName(assignmentRequest.name());
        // Set other fields from AssignmentRequest
        assignment.setStartTime(LocalDateTime.parse(assignmentRequest.startTime()));
        assignment.setEndTime(LocalDateTime.parse(assignmentRequest.endTime()));
        // Set file content
        try {
            assignment.setFile(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to read file", e);
        }
        return assignmentRepository.save(assignment);
    }

    public Assignment updateAssignment(Integer assignmentId, Assignment assignment) {
        // Additional logic for updating assignment
        Assignment existingAssignment = getAssignmentById(assignmentId);
        existingAssignment.setName(assignment.getName());
        existingAssignment.setStartTime(assignment.getStartTime());
        existingAssignment.setEndTime(assignment.getEndTime());
        // Update other fields as needed
        return assignmentRepository.save(existingAssignment);
    }

    public void deleteAssignment(Integer assignmentId) {
        // Additional logic for deleting assignment
        assignmentRepository.deleteById(assignmentId);
    }
}
