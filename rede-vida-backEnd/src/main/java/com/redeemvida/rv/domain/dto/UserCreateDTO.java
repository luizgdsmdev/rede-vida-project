package com.redeemvida.rv.domain.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public class UserCreateDTO {
    
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Size(max = 100, message = "Email must be less than 100 characters")
    private String email;
    
    @NotBlank(message = "CEP is required")
    @Pattern(regexp = "\\d{5}-?\\d{3}", message = "CEP must be in format XXXXX-XXX or XXXXXXXX")
    private String cep;
    
    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private Double latitude;
    
    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private Double longitude;
    
    @NotBlank(message = "CPF is required")
    @Pattern(regexp = "\\d{11}", message = "CPF must contain exactly 11 digits")
    private String cpf;
    
    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "\\+?\\d{10,15}", message = "Phone must be between 10 and 15 digits, optionally starting with +")
    private String phone;
    
    @NotNull(message = "Birth date is required")
    @Past(message = "Birth date must be in the past")
    private LocalDateTime birthDate;
    
    @NotBlank(message = "City is required")
    @Size(min = 2, max = 50, message = "City must be between 2 and 50 characters")
    private String city;
    
    @NotBlank(message = "State is required")
    @Size(min = 2, max = 2, message = "State must be exactly 2 characters")
    @Pattern(regexp = "[A-Z]{2}", message = "State must contain only uppercase letters")
    private String state;
    
    @NotBlank(message = "Blood type is required")
    @Pattern(regexp = "^(A|B|AB|O)[+-]|ALL$", message = "Blood type must be A+, A-, B+, B-, AB+, AB-, O+, O-, or ALL")
    private String bloodType;
    
    @NotNull(message = "Receive notifications preference is required")
    private Boolean receiveNotifications;
    
    @NotBlank(message = "User profile is required")
    @Pattern(regexp = "^(COMMON_USER|INSTITUTION)$", message = "User profile must be COMMON_USER or INSTITUTION")
    private String userProfile;

    public UserCreateDTO() {}

    public UserCreateDTO(String name, String email, String cep, double latitude, double longitude,
                        String cpf, String phone, LocalDateTime birthDate, String city, String state,
                        String bloodType, boolean receiveNotifications, String userProfile) {
        this.name = name;
        this.email = email;
        this.cep = cep;
        this.latitude = latitude;
        this.longitude = longitude;
        this.cpf = cpf;
        this.phone = phone;
        this.birthDate = birthDate;
        this.city = city;
        this.state = state;
        this.bloodType = bloodType;
        this.receiveNotifications = receiveNotifications;
        this.userProfile = userProfile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public LocalDateTime getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDateTime birthDate) {
        this.birthDate = birthDate;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getBloodType() {
        return bloodType;
    }

    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }

    public boolean isReceiveNotifications() {
        return receiveNotifications;
    }

    public void setReceiveNotifications(boolean receiveNotifications) {
        this.receiveNotifications = receiveNotifications;
    }

    public String getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(String userProfile) {
        this.userProfile = userProfile;
    }
}
