package com.project1.education.exception;

public class StartTimeIsBeforeNowException extends Exception{
    public StartTimeIsBeforeNowException(String msg) {
        super(msg);
    }
}
