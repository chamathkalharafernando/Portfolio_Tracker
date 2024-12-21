import React from "react";
import Dashboard from "./components/Dashboard";
import AddStockForm from "./components/AddStockForm";
import StockTable from "./components/StockTable";

function App() {
    return (
        <div>
            <h1>Portfolio Tracker</h1>
            <Dashboard />
            <AddStockForm />
            <StockTable />
        </div>
    );
}

export default App;
