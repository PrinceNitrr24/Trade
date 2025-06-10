import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Order {
  id: number;
  time: string;
  client: string;
  ticker: string;
  side: string;
  product: string;
  executedQty: number;
  totalQty: number;
  price: number;
  status: string;
  orderType: string;
}

interface OrdersTableProps {
  paginatedOrders: Order[];
  activeFilters: string[];
  addFilter: (ticker: string) => void;
  sortField: keyof Order;
  sortDirection: "asc" | "desc";
  handleSort: (field: string) => void;
  handleModifyOrder: (order: Order) => void;
  handleCancelOrder: (order: Order) => void;
}

export default function OrdersTable({
  paginatedOrders,
  activeFilters,
  addFilter,
  sortField,
  sortDirection,
  handleSort,
  handleModifyOrder,
  handleCancelOrder,
}: OrdersTableProps) {
  const getSideColor = (side: string) => {
    return side === "Buy" ? "text-green-600" : "text-red-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-800 border-green-200";
      case "Partial":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Modified":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead
                className="font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("time")}
              >
                <div className="flex items-center space-x-1">
                  <span>Time</span>
                  {sortField === "time" && (
                    <span className="text-blue-600">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead
                className="font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("client")}
              >
                <div className="flex items-center space-x-1">
                  <span>Client</span>
                  {sortField === "client" && (
                    <span className="text-blue-600">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead
                className="font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("ticker")}
              >
                <div className="flex items-center space-x-1">
                  <span>Ticker</span>
                  {sortField === "ticker" && (
                    <span className="text-blue-600">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Side
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Product
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Qty (Executed/Total)
              </TableHead>
              <TableHead
                className="font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  {sortField === "price" && (
                    <span className="text-blue-600">
                      {sortDirection === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-900">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow
                key={order.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell className="font-medium">{order.time}</TableCell>
                <TableCell>{order.client}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{order.ticker}</span>
                    {activeFilters.includes(order.ticker) && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                    <button
                      onClick={() => addFilter(order.ticker)}
                      className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      +Filter
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`font-medium ${getSideColor(order.side)}`}>
                    {order.side}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono">
                    {order.product}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium text-green-600">
                      {order.executedQty}
                    </span>
                    <span className="text-gray-400">/</span>
                    <span>{order.totalQty}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  ₹
                  {order.price.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(order.status)} border`}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-gray-100"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleModifyOrder(order)}
                      >
                        Modify Order
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleCancelOrder(order)}
                      >
                        Cancel Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
