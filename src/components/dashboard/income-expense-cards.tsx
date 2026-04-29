import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function IncomeCard() {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Total Income</h3>
            <div className="text-3xl font-bold text-gray-900">$124,500</div>
          </div>
          <div className="bg-[#154212] rounded-md p-1.5 flex items-center justify-center">
             <TrendingUp className="h-4 w-4 text-white" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-8 mt-2">
          <span className="bg-[#b1e3ab] text-[#154212] text-xs font-semibold px-2 py-0.5 rounded">
            +12%
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>

        <div className="h-24 flex items-end justify-between gap-2 mt-auto">
          {/* Mock bars */}
          <div className="w-full bg-[#a1d494] rounded-sm opacity-60 h-[20%]"></div>
          <div className="w-full bg-[#a1d494] rounded-sm opacity-60 h-[35%]"></div>
          <div className="w-full bg-[#a1d494] rounded-sm opacity-60 h-[25%]"></div>
          <div className="w-full bg-[#a1d494] rounded-sm opacity-60 h-[45%]"></div>
          <div className="w-full bg-[#a1d494] rounded-sm opacity-60 h-[40%]"></div>
          <div className="w-full bg-[#4d6643] rounded-sm h-[60%]"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ExpenseCard() {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Total Expenses</h3>
            <div className="text-3xl font-bold text-gray-900">$42,300</div>
          </div>
          <div className="bg-[#ffca98] rounded-md p-1.5 flex items-center justify-center">
             <TrendingDown className="h-4 w-4 text-[#7d562d]" />
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-8 mt-2">
          <span className="bg-[#fad1a3] text-[#7d562d] text-xs font-semibold px-2 py-0.5 rounded">
            -5%
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>

        <div className="h-24 flex items-end justify-between gap-2 mt-auto">
          {/* Mock bars */}
          <div className="w-full bg-[#f4caa3] rounded-sm opacity-80 h-[65%]"></div>
          <div className="w-full bg-[#f4caa3] rounded-sm opacity-80 h-[55%]"></div>
          <div className="w-full bg-[#f4caa3] rounded-sm opacity-80 h-[50%]"></div>
          <div className="w-full bg-[#f4caa3] rounded-sm opacity-80 h-[40%]"></div>
          <div className="w-full bg-[#f4caa3] rounded-sm opacity-80 h-[30%]"></div>
          <div className="w-full bg-[#a3805f] rounded-sm h-[20%]"></div>
        </div>
      </CardContent>
    </Card>
  );
}
