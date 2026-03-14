package com.redeemvida.rv.infrastructure.persistence.entity;

import jakarta.persistence.*;
import org.locationtech.jts.geom.Point;

import java.util.UUID;

@Entity
@Table(name = "donation_centers")
public class DonationCenterEntity {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    /*
     * Coluna geoespacial do PostGIS
     * GEOGRAPHY(Point,4326)
     */
    @Column(columnDefinition = "geography(Point,4326)")
    private Point location;

    public DonationCenterEntity() {}

    public DonationCenterEntity(UUID id, String name, String address, Point location) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.location = location;
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

    public Point getLocation() {
        return location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }
}
