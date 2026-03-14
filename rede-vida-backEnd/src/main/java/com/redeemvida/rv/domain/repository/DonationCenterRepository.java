package com.redeemvida.rv.domain.repository;

import com.redeemvida.rv.domain.model.DonationCenter;
import java.util.List;

public interface DonationCenterRepository {
    List<DonationCenter> findNearest(double lat, double lng);
}
