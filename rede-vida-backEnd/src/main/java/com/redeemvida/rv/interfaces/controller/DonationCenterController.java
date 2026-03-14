package com.redeemvida.rv.interfaces.controller;

import com.redeemvida.rv.application.usecase.FindNearestCentersUseCase;
import com.redeemvida.rv.domain.model.DonationCenter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/centers")
public class DonationCenterController {

    private final FindNearestCentersUseCase useCase;

    public DonationCenterController(FindNearestCentersUseCase useCase) {
        this.useCase = useCase;
    }

    @GetMapping("/nearest")
    public List<DonationCenter> findNearest(
            @RequestParam double lat,
            @RequestParam double lng) {

        return useCase.execute(lat, lng);
    }
}
