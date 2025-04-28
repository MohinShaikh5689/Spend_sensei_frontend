import Layout from "@/layout/layout";
import { useEffect, useState } from "react";
import { Button } from '@/components/ui/button';
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Budget {
    id: string;
    amount: number;
    category: string;
    description: string;
    transactionType: string;
    date: string;
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BudgetAnalyticsPage = () => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Generate array of years (current year down to 5 years ago)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

    const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    const [budgetData, setBudgetData] = useState<Budget[]>([]);
    const [transactions, setTransactions] = useState<Budget[]>([]); 
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');

    const fetchBudgetData = async () => {
        try {
            setIsLoading(true);
            const monthIndex = months.indexOf(selectedMonth) + 1;
            const response = await axios.post("http://localhost:3000/api/v1/budget/monthly", {
                month: monthIndex,
                year: selectedYear,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBudgetData(response.data);
        } catch (error:any) {
            alert(error.resonse.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchTransactionData = async () => {
        try {
            setIsLoading(true);
            const monthIndex = months.indexOf(selectedMonth) + 1;
            const response = await axios.post("http://localhost:3000/api/v1/transactions/get", {
                month: monthIndex,
                year: selectedYear,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTransactions(response.data);
        } catch (error:any) {
           alert(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBudgetData();
        fetchTransactionData();
    }, [selectedMonth, selectedYear]);

    // Aggregate budget data by category
    const budgetByCategoryMap: Record<string, number> = {};
    budgetData.forEach((budget) => {
        if (budgetByCategoryMap[budget.category]) {
            budgetByCategoryMap[budget.category] += budget.amount;
        } else {
            budgetByCategoryMap[budget.category] = budget.amount;
        }
    });

    // Aggregate transaction data by category (only expenses)
    const expensesByCategoryMap: Record<string, number> = {};
    transactions.forEach((transaction) => {
        if (transaction.transactionType === 'expense') {
            if (expensesByCategoryMap[transaction.category]) {
                expensesByCategoryMap[transaction.category] += transaction.amount;
            } else {
                expensesByCategoryMap[transaction.category] = transaction.amount;
            }
        }
    });

    // Get unique categories from both budgets and transactions
    const allCategories = Array.from(
        new Set([...Object.keys(budgetByCategoryMap), ...Object.keys(expensesByCategoryMap)])
    );

    // Prepare data for the chart
    const chartData = {
        labels: allCategories,
        datasets: [
            {
                label: 'Budgeted Amount',
                data: allCategories.map(category => budgetByCategoryMap[category] || 0),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                borderColor: 'rgba(53, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Actual Spending',
                data: allCategories.map(category => expensesByCategoryMap[category] || 0),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Layout>
            <div className="w-full max-w-full px-4 py-6 md:pl-64 lg:pl-72 md:pr-6">
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="w-full sm:w-auto">
                        <h1 className="text-2xl font-bold mb-4">Budget Analysis</h1>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <span className="text-sm font-medium">Filter by:</span>
                            <div className="flex flex-wrap gap-2">
                                <Select
                                    value={selectedMonth}
                                    onValueChange={(value) => setSelectedMonth(value)}
                                >
                                    <SelectTrigger className="w-full sm:w-[130px]">
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
                                    <SelectTrigger className="w-full sm:w-[100px]">
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
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setSelectedMonth(months[new Date().getMonth()]);
                            setSelectedYear(currentYear);
                        }}
                        className="w-full sm:w-auto mt-4 sm:mt-0"
                    >
                        Reset to Current Month
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Budget vs Actual Comparison Chart */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h2 className="text-xl font-semibold mb-6 text-center">Budget vs Actual Spending</h2>
                            <div className="h-96">
                                <Bar data={chartData} />
                            </div>
                        </div>

                        {/* Budget Summary Table */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h2 className="text-xl font-semibold mb-6">Budget Performance</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Budgeted</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actual</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {allCategories.map((category) => {
                                            const budgeted = budgetByCategoryMap[category] || 0;
                                            const actual = expensesByCategoryMap[category] || 0;
                                            const difference = budgeted - actual;
                                            const status = difference >= 0 ? 'Under Budget' : 'Over Budget';
                                            
                                            return (
                                                <tr key={category}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">₹{budgeted.toFixed(2)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">₹{actual.toFixed(2)}</td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-right ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {difference >= 0 ? '+' : ''}₹{difference.toFixed(2)}
                                                    </td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {status}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        <tr className="bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">Total</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                                                ₹{Object.values(budgetByCategoryMap).reduce((sum, amount) => sum + amount, 0).toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                                                ₹{Object.values(expensesByCategoryMap).reduce((sum, amount) => sum + amount, 0).toFixed(2)}
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right ${
                                                Object.values(budgetByCategoryMap).reduce((sum, amount) => sum + amount, 0) - 
                                                Object.values(expensesByCategoryMap).reduce((sum, amount) => sum + amount, 0) >= 0 
                                                    ? 'text-green-600' 
                                                    : 'text-red-600'
                                            }`}>
                                                {
                                                    Object.values(budgetByCategoryMap).reduce((sum, amount) => sum + amount, 0) - 
                                                    Object.values(expensesByCategoryMap).reduce((sum, amount) => sum + amount, 0) >= 0 
                                                        ? '+' 
                                                        : ''
                                                }
                                                ₹{(
                                                    Object.values(budgetByCategoryMap).reduce((sum, amount) => sum + amount, 0) - 
                                                    Object.values(expensesByCategoryMap).reduce((sum, amount) => sum + amount, 0)
                                                ).toFixed(2)}
                                            </td>
                                            <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right ${
                                                Object.values(budgetByCategoryMap).reduce((sum, amount) => sum + amount, 0) - 
                                                Object.values(expensesByCategoryMap).reduce((sum, amount) => sum + amount, 0) >= 0 
                                                    ? 'text-green-600' 
                                                    : 'text-red-600'
                                            }`}>
                                                {
                                                    Object.values(budgetByCategoryMap).reduce((sum, amount) => sum + amount, 0) - 
                                                    Object.values(expensesByCategoryMap).reduce((sum, amount) => sum + amount, 0) >= 0 
                                                        ? 'Under Budget' 
                                                        : 'Over Budget'
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};