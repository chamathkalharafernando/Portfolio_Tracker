package com.portfolio.controller;
import com.portfolio.model.Stock;
import com.portfolio.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @Autowired
    private StockService service;

    /**
     * Get all stocks.
     *
     * @return List of all stocks.
     */
    @GetMapping
    public ResponseEntity<List<Stock>> getAllStocks() {
        List<Stock> stocks = service.getAllStocks();
        return new ResponseEntity<>(stocks, HttpStatus.OK);
    }

    /**
     * Add a new stock.
     *
     * @param stock Stock object to be added.
     * @return Added stock object.
     */
    @PostMapping
    public ResponseEntity<Stock> addStock(@RequestBody Stock stock) {
        Stock savedStock = service.addStock(stock);
        return new ResponseEntity<>(savedStock, HttpStatus.CREATED);
    }

    /**
     * Update an existing stock by ID.
     *
     * @param id    ID of the stock to be updated.
     * @param stock Updated stock details.
     * @return Updated stock object.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Stock> updateStock(@PathVariable Long id, @RequestBody Stock stock) {
        Stock updatedStock = service.updateStock(id, stock);
        return new ResponseEntity<>(updatedStock, HttpStatus.OK);
    }

    /**
     * Delete a stock by ID.
     *
     * @param id ID of the stock to be deleted.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStock(@PathVariable Long id) {
        service.deleteStock(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Calculate total portfolio value.
     *
     * @return Total value of the portfolio.
     */
    @GetMapping("/portfolio-value")
    public ResponseEntity<Double> getPortfolioValue() {
        double totalValue = service.calculatePortfolioValue();
        return new ResponseEntity<>(totalValue, HttpStatus.OK);
    }
}
