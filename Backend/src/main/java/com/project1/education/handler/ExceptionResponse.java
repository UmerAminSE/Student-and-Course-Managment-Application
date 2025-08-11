package com.project1.education.handler;

import lombok.Builder;

@Builder
public record ExceptionResponse(
       String message
) {
}
