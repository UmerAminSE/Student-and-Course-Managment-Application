package com.project1.education.grade;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GradeId implements Serializable {
    @Column(name = "id_assignment_id")
    private Integer assignmentId;
    @Column(name = "id_student_id")
    private Integer studentId;
}
