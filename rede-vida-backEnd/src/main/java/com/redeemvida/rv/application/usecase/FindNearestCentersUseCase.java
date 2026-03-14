package com.redeemvida.rv.application.usecase;

import com.redeemvida.rv.domain.model.DonationCenter;
import com.redeemvida.rv.domain.repository.DonationCenterRepository;

import java.util.List;

public class FindNearestCentersUseCase {
    private final DonationCenterRepository repository;

    public FindNearestCentersUseCase(DonationCenterRepository repository) {
        this.repository = repository;
    }

    public List<DonationCenter> execute(double lat, double lng) {
        return repository.findNearest(lat, lng);
    }
}
