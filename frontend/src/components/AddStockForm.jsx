import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";

const AddStockForm = () => {
    const [stock, setStock] = useState({ name: "", ticker: "", quantity: 1, buyPrice: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/stocks", stock);
            alert("Stock Added!");
            setStock({ name: "", ticker: "", quantity: 1, buyPrice: "" }); // Reset form
        } catch (error) {
            console.error("Error adding stock:", error);
            alert("Failed to add stock");
        }
    };

    return (
        <Box sx={{ maxWidth: 500, margin: "auto", mt: 5 }}>
            <Typography variant="h5" gutterBottom>
                Add New Stock
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Stock Name"
                    fullWidth
                    margin="normal"
                    value={stock.name}
                    onChange={(e) => setStock({ ...stock, name: e.target.value })}
                    required
                />
                <TextField
                    label="Ticker"
                    fullWidth
                    margin="normal"
                    value={stock.ticker}
                    onChange={(e) => setStock({ ...stock, ticker: e.target.value })}
                    required
                />
                <TextField
                    label="Quantity"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={stock.quantity}
                    onChange={(e) => setStock({ ...stock, quantity: e.target.value })}
                    required
                />
                <TextField
                    label="Buy Price"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={stock.buyPrice}
                    onChange={(e) => setStock({ ...stock, buyPrice: e.target.value })}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Add Stock
                </Button>
            </form>
        </Box>
    );
};

export default AddStockForm;
