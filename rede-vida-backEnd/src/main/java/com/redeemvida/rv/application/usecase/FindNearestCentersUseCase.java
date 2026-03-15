package com.redeemvida.rv.application.usecase;

import com.redeemvida.rv.domain.entity.DonationCenter;
import com.redeemvida.rv.domain.repository.DonationCenterRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class FindNearestCentersUseCase {
    private final DonationCenterRepository repository;

    public FindNearestCentersUseCase(DonationCenterRepository repository) {
        this.repository = repository;
    }

    public List<DonationCenter> execute(double lat, double lng) {
        return repository.findNearest(lat, lng);
    }
}
