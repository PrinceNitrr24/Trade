import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  clients: string[];
  products: string[];
  statuses: string[];
  selectedClient: string;
  setSelectedClient: (value: string) => void;
  selectedProduct: string;
  setSelectedProduct: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  activeFilters: string[];
  removeFilter: (filter: string) => void;
  clearAllFilters: () => void;
}

export default function Filters({
  clients,
  products,
  statuses,
  selectedClient,
  setSelectedClient,
  selectedProduct,
  setSelectedProduct,
  selectedStatus,
  setSelectedStatus,
  searchQuery,
  setSearchQuery,
  activeFilters,
  removeFilter,
  clearAllFilters,
}: FiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <Label
            htmlFor="client-select"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Client
          </Label>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client} value={client}>
                  {client}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label
            htmlFor="product-select"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Product
          </Label>
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product} value={product}>
                  {product}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label
            htmlFor="status-select"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Status
          </Label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label
            htmlFor="search"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="search"
              placeholder="Search ticker or client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700">
          Active Filters:
        </span>
        {activeFilters.map((filter) => (
          <Badge key={filter} variant="secondary" className="px-3 py-1">
            {filter}
            <button
              onClick={() => removeFilter(filter)}
              className="ml-2 hover:text-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        {(activeFilters.length > 0 ||
          selectedClient !== "All Clients" ||
          selectedProduct !== "All Products" ||
          selectedStatus !== "All Status" ||
          searchQuery) && (
          <Button
            variant="destructive"
            size="sm"
            onClick={clearAllFilters}
            className="ml-2"
          >
            Clear all filters
          </Button>
        )}
      </div>
    </div>
  );
}
