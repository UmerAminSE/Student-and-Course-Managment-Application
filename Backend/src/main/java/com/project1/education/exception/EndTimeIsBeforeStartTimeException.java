package com.project1.education.exception;

public class EndTimeIsBeforeStartTimeException extends Exception {
    public EndTimeIsBeforeStartTimeException(String msg) {
        super(msg);
    }
}
