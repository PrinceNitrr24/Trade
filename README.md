# 📈 Trading Dashboard

A real-time trading dashboard built with Next.js  app router, TypeScript, and Tailwind CSS. It simulates stock orders, filtering, sorting, modifying, and cancelling orders.

## 🚀 Features

- Real-time stock ticker updates(for now it's not real time)
- Filter orders by client, product, and status
- Modify and cancel orders with dialogs
- CSV download for open orders
- Responsive and user-friendly UI

## 📁 Project Structure
/app/(Home)/_components/
├── TradingDashboard.tsx
├── OrdersTable.tsx
├── Filters.tsx
├── Pagination.tsx
├── Header.tsx
├── ModifyOrderDialog.tsx
└── CancelOrderDialog.tsx

## 🛠 Tech Stack

- Next.js app router + TypeScript
- Tailwind CSS
- Lucide React Icons
- Next.js App Directory



How It Works
useEffect simulates stock price updates every 3 seconds

useMemo optimizes filtered and sorted order rendering

CSV export uses Blob API for client-side download

Dialogs manage modify/cancel actions with state

## 📦 Getting Started

```bash
npm install
npm run dev


