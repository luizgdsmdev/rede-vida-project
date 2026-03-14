package com.redeemvida.rv.domain.model;
import java.util.UUID;

public class User {

    private UUID id;
    private String name;
    private String email;
    private String cep;
    private double latitude;
    private double longitude;

    public User(UUID id, String name, String email, String cep, double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.cep = cep;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getCep() {
        return cep;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

}
