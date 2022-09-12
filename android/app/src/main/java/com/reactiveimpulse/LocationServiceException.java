package com.reactiveimpulse;

public class LocationServiceException extends Exception {

    public LocationServiceException(String detailMessage, Throwable throwable) {
        super(detailMessage, throwable);
    }

    public LocationServiceException(String detailMessage) {
        super(detailMessage);
    }
}