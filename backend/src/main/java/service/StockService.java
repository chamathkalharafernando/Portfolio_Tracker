package com.portfolio.service;

import com.portfolio.model.Stock;
import com.portfolio.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {
    @Autowired
    private StockRepository repository;

    public List<Stock> getAllStocks() {
        return repository.findAll();
    }

    public Stock addStock(Stock stock) {
        return repository.save(stock);
    }

    public Stock updateStock(Long id, Stock updatedStock) {
        Stock stock = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock not found"));
        stock.setName(updatedStock.getName());
        stock.setTicker(updatedStock.getTicker());
        stock.setQuantity(updatedStock.getQuantity());
        stock.setBuyPrice(updatedStock.getBuyPrice());
        return repository.save(stock);
    }

    public void deleteStock(Long id) {
        repository.deleteById(id);
    }

    public double calculatePortfolioValue() {
        return repository.findAll().stream()
                .mapToDouble(stock -> stock.getQuantity() * stock.getBuyPrice())
                .sum();
    }
}
