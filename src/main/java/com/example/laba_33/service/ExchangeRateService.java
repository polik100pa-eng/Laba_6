package com.example.laba_33.service;

import org.springframework.stereotype.Service;

@Service
public class ExchangeRateService {

    public double getRate(String currencyCode) {
        return switch (currencyCode.toUpperCase()) {
            case "USD" -> 3.25;
            case "EUR" -> 3.50;
            case "RUB" -> 0.035;
            default -> throw new IllegalArgumentException("Unsupported currency: " + currencyCode);
        };
    }
}
