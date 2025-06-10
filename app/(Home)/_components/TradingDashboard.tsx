"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import OrdersTable from "./OrdersTable";
import Pagination from "./Pagination";
import ModifyOrderDialog from "./ModifyOrderDialog";
import CancelOrderDialog from "./CancelOrderDialog";
import Header from "./Header";
import Filters from "./Filters";

// Define interfaces for data structures
interface StockTicker {
  name: string;
  value: number;
  change: number;
  trend: "up" | "down" | "neutral";
}

interface Order {
  id: number;
  time: string;
  client: string;
  ticker: string;
  side: "Buy" | "Sell";
  product: "CNC" | "NRML" | "INTRADAY";
  executedQty: number;
  totalQty: number;
  price: number;
  status: "Partial" | "Complete" | "Pending" | "Modified";
  orderType: "LIMIT" | "MARKET";
}

// Initial stock ticker data
const initialStockTickers: StockTicker[] = [
  { name: "SIGNORIA", value: 0.0, change: 0, trend: "neutral" },
  { name: "NIFTY BANK", value: 52323.3, change: 1.2, trend: "up" },
  { name: "NIFTY FIN SERVICE", value: 25255.75, change: 0.8, trend: "up" },
  { name: "RELCHEMO", value: 162.73, change: -0.5, trend: "down" },
];

// Initial orders data
const initialOrders: Order[] = [
  {
    id: 1,
    time: "08:14:31",
    client: "AAA001",
    ticker: "RELIANCE",
    side: "Buy",
    product: "CNC",
    executedQty: 50,
    totalQty: 100,
    price: 250.5,
    status: "Partial",
    orderType: "LIMIT",
  },
  {
    id: 2,
    time: "08:14:31",
    client: "AAA003",
    ticker: "MRF",
    side: "Buy",
    product: "NRML",
    executedQty: 10,
    totalQty: 20,
    price: 2700.0,
    status: "Partial",
    orderType: "LIMIT",
  },
  {
    id: 3,
    time: "08:14:31",
    client: "AAA002",
    ticker: "ASIANPAINT",
    side: "Buy",
    product: "NRML",
    executedQty: 10,
    totalQty: 30,
    price: 1500.6,
    status: "Partial",
    orderType: "LIMIT",
  },
  {
    id: 4,
    time: "08:14:31",
    client: "AAA002",
    ticker: "TATAINVEST",
    side: "Sell",
    product: "INTRADAY",
    executedQty: 10,
    totalQty: 10,
    price: 2300.1,
    status: "Complete",
    orderType: "MARKET",
  },
  {
    id: 5,
    time: "08:15:22",
    client: "AAA001",
    ticker: "HDFC",
    side: "Sell",
    product: "CNC",
    executedQty: 0,
    totalQty: 25,
    price: 1650.75,
    status: "Pending",
    orderType: "LIMIT",
  },
  {
    id: 6,
    time: "08:16:45",
    client: "AAA003",
    ticker: "ICICIBANK",
    side: "Buy",
    product: "NRML",
    executedQty: 15,
    totalQty: 50,
    price: 950.25,
    status: "Partial",
    orderType: "LIMIT",
  },
];

const clients: string[] = ["All Clients", "AAA001", "AAA002", "AAA003"];
const products: string[] = ["All Products", "CNC", "NRML", "INTRADAY"];
const statuses: string[] = ["All Status", "Pending", "Partial", "Complete"];

export default function TradingDashboard() {
  const [stockTickers, setStockTickers] =
    useState<StockTicker[]>(initialStockTickers);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "RELIANCE",
    "ASIANPAINT",
  ]);
  const [selectedClient, setSelectedClient] = useState<string>("AAA002");
  const [selectedProduct, setSelectedProduct] =
    useState<string>("All Products");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Status");
  const [sortField, setSortField] = useState<keyof Order>("time");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [modifyDialogOpen, setModifyDialogOpen] = useState<boolean>(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modifyPrice, setModifyPrice] = useState<string>("");
  const [modifyQuantity, setModifyQuantity] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Simulate real-time stock price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStockTickers((prev) =>
        prev.map((stock) => {
          if (stock.name === "SIGNORIA") return stock;

          const changePercent = (Math.random() - 0.5) * 0.2;
          const newValue = stock.value * (1 + changePercent / 100);
          const newChange = stock.change + changePercent;

          return {
            ...stock,
            value: parseFloat(newValue.toFixed(2)),
            change: parseFloat(newChange.toFixed(2)),
            trend: newChange > 0 ? "up" : newChange < 0 ? "down" : "neutral",
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Filter and search functionality
  const filteredOrders = useMemo(() => {
    let filtered = orders;

    if (selectedClient !== "All Clients") {
      filtered = filtered.filter((order) => order.client === selectedClient);
    }

    if (selectedProduct !== "All Products") {
      filtered = filtered.filter((order) => order.product === selectedProduct);
    }

    if (selectedStatus !== "All Status") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.client.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeFilters.length > 0) {
      filtered = filtered.filter((order) =>
        activeFilters.includes(order.ticker)
      );
    }

    return filtered;
  }, [
    orders,
    selectedClient,
    selectedProduct,
    selectedStatus,
    searchQuery,
    activeFilters,
  ]);

  // Sorting functionality
  const sortedOrders = useMemo(() => {
    const sorted = [...filteredOrders].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "price") {
        aValue = parseFloat(aValue as any);
        bValue = parseFloat(bValue as any);
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return sorted;
  }, [filteredOrders, sortField, sortDirection]);

  // Pagination
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedOrders, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  const handleSort: any = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters((prev) => prev.filter((f) => f !== filter));
  };

  const addFilter = (ticker: string) => {
    if (!activeFilters.includes(ticker)) {
      setActiveFilters((prev) => [...prev, ticker]);
    }
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedClient("All Clients");
    setSelectedProduct("All Products");
    setSelectedStatus("All Status");
    setSearchQuery("");
  };

  const handleModifyOrder: any = (order: Order) => {
    setSelectedOrder(order);
    setModifyPrice(order.price.toString());
    setModifyQuantity(order.totalQty.toString());
    setModifyDialogOpen(true);
  };

  const handleCancelOrder: any = (order: Order) => {
    setSelectedOrder(order);
    setCancelDialogOpen(true);
  };

  const confirmModifyOrder = () => {
    if (selectedOrder) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id
            ? {
                ...order,
                price: parseFloat(modifyPrice),
                totalQty: parseInt(modifyQuantity),
                status: "Modified" as Order["status"],
              }
            : order
        )
      );
    }
    setModifyDialogOpen(false);
    setSelectedOrder(null);
  };

  const confirmCancelOrder = () => {
    if (selectedOrder) {
      setOrders((prev) =>
        prev.filter((order) => order.id !== selectedOrder.id)
      );
    }
    setCancelDialogOpen(false);
    setSelectedOrder(null);
  };

  const downloadOrders = () => {
    const csvContent = [
      [
        "Time",
        "Client",
        "Ticker",
        "Side",
        "Product",
        "Executed Qty",
        "Total Qty",
        "Price",
        "Status",
      ],
      ...sortedOrders.map((order) => [
        order.time,
        order.client,
        order.ticker,
        order.side,
        order.product,
        order.executedQty,
        order.totalQty,
        order.price,
        order.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "open_orders.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        stockTickers={stockTickers}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
            Open Orders
          </h1>
          <Button
            onClick={downloadOrders}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </Button>
        </div>
        <Filters
          clients={clients}
          products={products}
          statuses={statuses}
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilters={activeFilters}
          removeFilter={removeFilter}
          clearAllFilters={clearAllFilters}
        />
        <OrdersTable
          paginatedOrders={paginatedOrders}
          activeFilters={activeFilters}
          addFilter={addFilter}
          sortField={sortField}
          sortDirection={sortDirection}
          handleSort={handleSort}
          handleModifyOrder={handleModifyOrder}
          handleCancelOrder={handleCancelOrder}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          sortedOrders={sortedOrders}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </main>
      <ModifyOrderDialog
        open={modifyDialogOpen}
        setOpen={setModifyDialogOpen}
        selectedOrder={selectedOrder}
        modifyPrice={modifyPrice}
        setModifyPrice={setModifyPrice}
        modifyQuantity={modifyQuantity}
        setModifyQuantity={setModifyQuantity}
        confirmModifyOrder={confirmModifyOrder}
      />
      <CancelOrderDialog
        open={cancelDialogOpen}
        setOpen={setCancelDialogOpen}
        selectedOrder={selectedOrder}
        confirmCancelOrder={confirmCancelOrder}
      />
    </div>
  );
}
