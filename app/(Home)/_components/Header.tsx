import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import StockTicker from "./StockTicker";

type Stock = {
  name: string;
  value: number;
  change: number;
  trend: string;
};

interface HeaderProps {
  stockTickers: Stock[];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export default function Header({
  stockTickers,
  mobileMenuOpen,
  setMobileMenuOpen,
}: HeaderProps): JSX.Element {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
            </div>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
            
            </Sheet>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            {stockTickers.map((stock, index) => (
              <StockTicker key={index} stock={stock} />
            ))}
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              MARKETWATCH
            </Link>
            <Link
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              EXCHANGE FILES
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                <span>PORTFOLIO</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Holdings</DropdownMenuItem>
                <DropdownMenuItem>Positions</DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors">
                <span>FUNDS</span>
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Add Funds</DropdownMenuItem>
                <DropdownMenuItem>Withdraw</DropdownMenuItem>
                <DropdownMenuItem>History</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="w-12 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-blue-700 transition-colors">
              LK
            </div>
          </nav>
        </div>
        <div className="md:hidden border-t border-gray-200 px-4 py-3 overflow-x-auto">
          <div className="flex space-x-6 min-w-max">
            {stockTickers.map((stock, index) => (
              <StockTicker key={index} stock={stock} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
