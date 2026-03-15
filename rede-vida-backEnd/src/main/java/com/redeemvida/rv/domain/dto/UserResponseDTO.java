package com.redeemvida.rv.domain.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class UserResponseDTO {
    
    private UUID id;
    private String name;
    private String email;
    private String cep;
    private double latitude;
    private double longitude;
    private String cpf;
    private String phone;
    private LocalDateTime birthDate;
    private String city;
    private String state;
    private String bloodType;
    private boolean receiveNotifications;
    private String userProfile;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean active;

    public UserResponseDTO() {}

    public UserResponseDTO(UUID id, String name, String email, String cep, double latitude, double longitude,
                          String cpf, String phone, LocalDateTime birthDate, String city, String state,
                          String bloodType, boolean receiveNotifications, String userProfile,
                          LocalDateTime createdAt, LocalDateTime updatedAt, boolean active) {
        this.id = id;
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
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.active = active;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
