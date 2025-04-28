import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

interface TransactionCardProps {
  transactions: number;
  selectedMonth: string;
  selectedYear: string | number;
  name: string;
  type?: 'balance' | 'expense' | 'income';
}

export const TransactionCard = ({ transactions, selectedMonth, selectedYear, name, type = 'balance' }: TransactionCardProps) => {

    const renderIcon = () => {
        switch (type) {
            case 'expense':
                return <TrendingDown className="h-5 w-5 text-red-500" />;
            case 'income':
                return <TrendingUp className="h-5 w-5 text-green-500" />;
            default:
                return <Wallet className="h-5 w-5 text-blue-500" />;
        }
    }

 return(
     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-medium text-gray-500 dark:text-gray-400">{name}</h3>
                     {renderIcon()}
                  </div>
                  <p className="text-3xl font-bold">₹{transactions.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-2">{selectedMonth} {selectedYear}</p>
                </div>
  )
}