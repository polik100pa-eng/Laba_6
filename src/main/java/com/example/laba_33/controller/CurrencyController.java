package com.example.laba_33.controller;
import com.example.laba_33.dto.ConvertRequest;
import com.example.laba_33.dto.ConvertResponse;
import com.example.laba_33.dto.RateResponse;
import com.example.laba_33.service.ExchangeRateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api")
public class CurrencyController {
    private final ExchangeRateService exchangeRateService;
    public CurrencyController(ExchangeRateService exchangeRateService) {
        this.exchangeRateService = exchangeRateService;
    }
    @GetMapping("/rates/{currencyCode}")
    public ResponseEntity<RateResponse> getRate(@PathVariable String currencyCode) {
        double rate = exchangeRateService.getRate(currencyCode);
        return ResponseEntity.ok(new RateResponse(currencyCode, rate));
    }
    @PostMapping("/convert")
    public ResponseEntity<ConvertResponse> convert(@RequestBody ConvertRequest request) {

        if (request.getAmount() <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }
        if (request.getRate() <= 0) {
            throw new IllegalArgumentException("Rate must be greater than zero");
        }
        double result = request.getAmount() * request.getRate();
        result = Math.round(result * 100.0) / 100.0;
        return ResponseEntity.ok(new ConvertResponse(result));
    }
}
