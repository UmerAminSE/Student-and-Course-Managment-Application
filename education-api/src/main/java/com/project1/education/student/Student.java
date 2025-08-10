package com.project1.education.student;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int student_id;
    private String first_name;
    private String last_name;
    private String age;
    private String email;
    private String degree;
    private String program;
}
