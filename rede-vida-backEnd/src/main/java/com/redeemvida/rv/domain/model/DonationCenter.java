package com.redeemvida.rv.domain.model;

import java.util.UUID;

public class DonationCenter {

    private UUID id;
    private String name;
    private String address;
    private double latitude;
    private double longitude;

    public DonationCenter(UUID id, String name, String address, double latitude, double longitude) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

}
