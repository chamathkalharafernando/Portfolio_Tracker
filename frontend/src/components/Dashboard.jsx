import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Box } from "@mui/material";

const Dashboard = () => {
    const [portfolioValue, setPortfolioValue] = useState(0);

    useEffect(() => {
        const fetchPortfolioValue = async () => {
            try {
                const response = await axios.get("/api/stocks/portfolio-value");
                setPortfolioValue(response.data);
            } catch (error) {
                console.error("Error fetching portfolio value:", error);
            }
        };
        fetchPortfolioValue();
    }, []);

    return (
        <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h4">Portfolio Dashboard</Typography>
            <Typography variant="h6" color="primary">
                Total Portfolio Value: ${portfolioValue.toFixed(2)}
            </Typography>
        </Box>
    );
};

export default Dashboard;
