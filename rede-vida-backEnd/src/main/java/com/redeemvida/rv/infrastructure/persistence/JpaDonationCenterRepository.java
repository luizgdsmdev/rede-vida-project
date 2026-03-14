package com.redeemvida.rv.infrastructure.persistence;

import com.redeemvida.rv.domain.model.DonationCenter;
import com.redeemvida.rv.domain.repository.DonationCenterRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.ArrayList;
import java.util.UUID;

@Repository
public class JpaDonationCenterRepository implements DonationCenterRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<DonationCenter> findNearest(double lat, double lng) {

        String sql = """
        SELECT id, name
        FROM donation_centers
        ORDER BY location <-> ST_SetSRID(ST_MakePoint(:lng,:lat),4326)
        LIMIT 5
        """;

        @SuppressWarnings("unchecked")
        List<Object[]> results = entityManager.createNativeQuery(sql)
                .setParameter("lat", lat)
                .setParameter("lng", lng)
                .getResultList();

        List<DonationCenter> donationCenters = new ArrayList<>();
        for (Object[] row : results) {
            UUID id = UUID.fromString((String) row[0]);
            String name = (String) row[1];
            donationCenters.add(new DonationCenter(id, name, null, 0, 0));
        }

        return donationCenters;
    }
}

