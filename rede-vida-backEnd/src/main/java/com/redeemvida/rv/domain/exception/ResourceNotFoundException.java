package com.redeemvida.rv.domain.exception;

public class ResourceNotFoundException extends RuntimeException {
    
    private final String errorCode;
    
    public ResourceNotFoundException(String message) {
        super(message);
        this.errorCode = "RESOURCE_NOT_FOUND";
    }
    
    public ResourceNotFoundException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
    
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
        this.errorCode = "RESOURCE_NOT_FOUND";
    }
    
    public ResourceNotFoundException(String message, String errorCode, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }
    
    public String getErrorCode() {
        return errorCode;
    }
}
