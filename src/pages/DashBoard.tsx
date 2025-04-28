import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/layout/layout';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, } from 'lucide-react';
import { format } from 'date-fns';
import { TransactionCard } from '@/components/transaction-card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input';

interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  transactionType: string;
  date: string;
}

const categoryColors: Record<string, string> = {
  salary: "bg-blue-100 text-blue-600",
  business: "bg-indigo-100 text-indigo-600",
  investment: "bg-purple-100 text-purple-600",
  food: "bg-orange-100 text-orange-600",
  transportation: "bg-amber-100 text-amber-600",
  entertainment: "bg-pink-100 text-pink-600",
  health: "bg-green-100 text-green-600",
  education: "bg-cyan-100 text-cyan-600",
  shopping: "bg-violet-100 text-violet-600",
  grocery: "bg-lime-100 text-lime-600",
  "balance forward": "bg-teal-100 text-teal-600",
  other: "bg-gray-100 text-gray-600",
};

// Months array for the dropdown
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Generate array of years (current year down to 5 years ago)
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

const DashBoard: React.FC = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('name') || 'User';
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [ formData, setFormData ] = useState({
    description: '',
    amount: 0,
    transactionType: '',
    category: '',
  });
  const token = localStorage.getItem('token');

  const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const fetchTransactionData = async () => {
    try {
      const monthIndex = months.indexOf(selectedMonth);
      const response = await axios.post('http://localhost:3000/api/v1/transactions/get', {
        month: monthIndex + 1,
        year: selectedYear,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(response.data);
    } catch (error:any) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchTransactionData();
  }, [selectedMonth, selectedYear]);

  const calculateSummary = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
      if (transaction.transactionType === 'income') {
        totalIncome += transaction.amount;
      } else if (transaction.transactionType === 'expense') {
        totalExpense += transaction.amount;
      }
    });

    return {
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense
    };
  };

  const { totalBalance, totalIncome, totalExpense } = calculateSummary();

  // Get recent 10 transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  const handleCardVisiblity = () => {
    setIsCardVisible(!isCardVisible);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:3000/api/v1/transactions', {
        ...formData,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setIsCardVisible(false);
        fetchTransactionData();
      }

      setFormData({
        description: '',
        amount: 0,
        transactionType: '',
        category: '',
      });
      setIsCardVisible(false);
      fetchTransactionData();
    }catch (error:any) {
      alert(error.response.data.message);
    }
  };

  return (
    <Layout>


      {isCardVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add Transaction</CardTitle>
                <CardDescription>Quickly add your financial transactions to keep track of your money flow.</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <form onSubmit={handleSubmit} id='transaction'>
                  <Input
                    type="text"
                    placeholder="Description"
                    className="mb-4"
                    required
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Amount"
                    className="mb-4"
                    required
                    onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                  />
                  <Select
                    defaultValue="income"
                    onValueChange={(value) => setFormData({ ...formData, transactionType: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Transaction Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select><br/>

                  <Select
                    defaultValue="salary"
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(categoryColors).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </form>
              </div>

            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCardVisiblity}>Cancel</Button>
              <Button type='submit' form='transaction' >Save</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="w-full md:pl-64 lg:pl-72">
        <div className="max-w-6xl mx-auto px-4 py-6 md:px-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <h1 className="text-2xl font-bold">Welcome, {userName}!</h1>
            <Button className="flex items-center gap-2" onClick={handleCardVisiblity}>
              <Plus size={16} /> Add Transaction
            </Button>
          </div>

          {/* Date filter section */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-3">Filter by:</span>
              <div className="flex gap-2">
                <Select
                  value={selectedMonth}
                  onValueChange={(value) => setSelectedMonth(value)}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedYear.toString()}
                  onValueChange={(value) => setSelectedYear(parseInt(value))}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedMonth(months[new Date().getMonth()]);
                setSelectedYear(currentYear);
              }}
              className="ml-auto text-xs"
            >
              Reset to Current Month
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">

            <TransactionCard transactions={totalBalance} selectedMonth={selectedMonth} selectedYear={selectedYear} name="Total Balance" />

            <TransactionCard transactions={totalIncome} selectedMonth={selectedMonth} selectedYear={selectedYear} name="Total Income" type="income" />

            <TransactionCard transactions={totalExpense} selectedMonth={selectedMonth} selectedYear={selectedYear} name="Total Expenses" type="expense" />
          </div>

          {/* Recent Transactions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/transactions')}>
                View All
              </Button>
            </div>

            {recentTransactions.length > 0 ? (
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${categoryColors[transaction.category.toLowerCase()] || categoryColors.other}`}>
                        {transaction.category.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(transaction.date)}
                          <span className="mx-1">•</span>
                          <span className="capitalize">{transaction.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${transaction.transactionType === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.transactionType === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No transactions found for {selectedMonth} {selectedYear}.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => navigate('/add-transaction')}
                >
                  <Plus size={16} className="mr-2" /> Add Transaction
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;