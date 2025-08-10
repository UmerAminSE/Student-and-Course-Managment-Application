package com.project1.education.assignment;

import com.project1.education.course.Course;
import com.project1.education.grade.Grade;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Assignment {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime uploadTime;
    @OneToMany(mappedBy = "assignment", cascade = CascadeType.REMOVE)
    private List<Grade> grades;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    @Lob // Indicates large object field
    @Column(name = "file_content", columnDefinition = "BYTEA") // Use BYTEA for PostgreSQL
    private byte[] fileContent; // Field to store file content as byte array

    public Integer getCurrentGradedTotal(){
        List<Grade> currentGraded = grades.stream()
                .filter(s -> s.getGrade() != 0)
                .toList();
        return currentGraded.size();
    }

    public void setFile(byte[] bytes) {
    }
}
