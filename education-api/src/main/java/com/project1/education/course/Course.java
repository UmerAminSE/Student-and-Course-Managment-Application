package com.project1.education.course;

import com.fasterxml.jackson.annotation.*;
import com.project1.education.assignment.Assignment;
import com.project1.education.student.Student;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name="courses")

public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer course_id;

    private String course_name;

    private String start_date;

    private String end_date;

    private Integer number_of_participants;

    private String semester;

}