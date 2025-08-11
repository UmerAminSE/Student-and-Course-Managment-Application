package com.project1.education.grade;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.project1.education.assignment.Assignment;
import com.project1.education.student.Student;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Grade {
    @EmbeddedId
    private GradeId id;
    private float grade;
    @ManyToOne
    @JoinColumn(name = "assignment_id")
    @JsonBackReference
    private Assignment assignment;
    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonBackReference
    private Student student;
}
