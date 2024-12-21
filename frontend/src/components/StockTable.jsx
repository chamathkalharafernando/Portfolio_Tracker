import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Snackbar,
    Alert,
    Typography,
    IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const StockTable = () => {
    const [stocks, setStocks] = useState([]);
    const [editStock, setEditStock] = useState(null);
    const [deleteStockId, setDeleteStockId] = useState(null); // Stock to delete
    const [notification, setNotification] = useState({ message: "", severity: "" });
    const [showNotification, setShowNotification] = useState(false);

    // Fetch all stocks from the backend
    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const response = await axios.get("/api/stocks");
                setStocks(response.data);
            } catch (error) {
                console.error("Error fetching stocks:", error);
            }
        };
        fetchStocks();
    }, []);

    // Handle delete operation
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/stocks/${deleteStockId}`);
            setStocks(stocks.filter((stock) => stock.id !== deleteStockId));
            setNotification({ message: "Stock deleted successfully!", severity: "success" });
        } catch (error) {
            setNotification({ message: "Failed to delete stock.", severity: "error" });
        } finally {
            setDeleteStockId(null);
            setShowNotification(true);
        }
    };

    // Open the edit dialog
    const handleEditOpen = (stock) => {
        setEditStock({ ...stock });
    };

    // Close the edit dialog
    const handleEditClose = () => {
        setEditStock(null);
    };

    // Handle submitting the edited stock
    const handleEditSubmit = async () => {
        try {
            await axios.put(`/api/stocks/${editStock.id}`, editStock);
            setStocks(
                stocks.map((stock) =>
                    stock.id === editStock.id ? editStock : stock
                )
            );
            setNotification({ message: "Stock updated successfully!", severity: "success" });
        } catch (error) {
            setNotification({ message: "Failed to update stock.", severity: "error" });
        } finally {
            handleEditClose();
            setShowNotification(true);
        }
    };

    // Close the notification snackbar
    const handleNotificationClose = () => {
        setShowNotification(false);
    };

    return (
        <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", mt: 5, p: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: "primary.main" }}>
                Stock Portfolio
            </Typography>
            <Table>
                <TableHead sx={{ bgcolor: "primary.light" }}>
                    <TableRow>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Ticker</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Quantity</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Buy Price</TableCell>
                        <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stocks.map((stock) => (
                        <TableRow key={stock.id}>
                            <TableCell>{stock.name}</TableCell>
                            <TableCell>{stock.ticker}</TableCell>
                            <TableCell>{stock.quantity}</TableCell>
                            <TableCell>{stock.buyPrice}</TableCell>
                            <TableCell>
                                <IconButton
                                    color="primary"
                                    onClick={() => handleEditOpen(stock)}
                                >
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    onClick={() => setDeleteStockId(stock.id)}
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Edit Dialog */}
            {editStock && (
                <Dialog open={true} onClose={handleEditClose}>
                    <DialogTitle>Edit Stock</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Stock Name"
                            fullWidth
                            margin="normal"
                            value={editStock.name}
                            onChange={(e) =>
                                setEditStock({ ...editStock, name: e.target.value })
                            }
                        />
                        <TextField
                            label="Ticker"
                            fullWidth
                            margin="normal"
                            value={editStock.ticker}
                            onChange={(e) =>
                                setEditStock({ ...editStock, ticker: e.target.value })
                            }
                        />
                        <TextField
                            label="Quantity"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={editStock.quantity}
                            onChange={(e) =>
                                setEditStock({ ...editStock, quantity: e.target.value })
                            }
                        />
                        <TextField
                            label="Buy Price"
                            type="number"
                            fullWidth
                            margin="normal"
                            value={editStock.buyPrice}
                            onChange={(e) =>
                                setEditStock({ ...editStock, buyPrice: e.target.value })
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleEditSubmit} variant="contained" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Delete Confirmation Dialog */}
            {deleteStockId && (
                <Dialog open={true} onClose={() => setDeleteStockId(null)}>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        Are you sure you want to delete this stock?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDeleteStockId(null)} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} variant="contained" color="error">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* Notification Snackbar */}
            <Snackbar
                open={showNotification}
                autoHideDuration={3000}
                onClose={handleNotificationClose}
            >
                <Alert
                    onClose={handleNotificationClose}
                    severity={notification.severity}
                    sx={{ width: "100%" }}
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </TableContainer>
    );
};

export default StockTable;
