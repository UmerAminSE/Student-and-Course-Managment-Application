package com.project1.education.student;

public record StudentChangeEmailRequest(
        String oldEmail,
        String newEmail
) {
}
