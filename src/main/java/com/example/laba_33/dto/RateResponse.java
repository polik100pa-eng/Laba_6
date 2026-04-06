package com.example.laba_33.dto;

public class RateResponse {

    private String currencyCode;
    private double rate;

    public RateResponse(String currencyCode, double rate) {
        this.currencyCode = currencyCode;
        this.rate = rate;
    }

    public String getCurrencyCode() {
        return currencyCode;
    }

    public double getRate() {
        return rate;
    }
}