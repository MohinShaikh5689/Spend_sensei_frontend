import Layout from "@/layout/layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from '@/components/ui/button';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Transaction {
    id: string;
    amount: number;
    category: string;
    description: string;
    transactionType: string;
    date: string;
}

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];
const currentYear = new Date().getFullYear();
const currentDate = new Date().getFullYear();
const years = Array.from({ length: 6 }, (_, i) => currentDate - i);

export const AnalyticPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const token = localStorage.getItem("token");

    const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);
    const [isLoading, setIsLoading] = useState(false);
    
    // Aggregate transactions by category
    const categoryMap: Record<string, number> = {};
    
    transactions.forEach((transaction) => {
        if (categoryMap[transaction.category]) {
            categoryMap[transaction.category] += transaction.amount;
        } else {
            categoryMap[transaction.category] = transaction.amount;
        }
    });
    
    // Convert aggregated data to chart format
    const labels = Object.keys(categoryMap);
    const amounts = Object.values(categoryMap);
    
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Transaction Amount',
                data: amounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(201, 203, 207, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(201, 203, 207, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const expenseMap : Record<string, number> = {};
    const incomeMap : Record<string, number> = {};
    transactions.forEach((transaction) => {
        if (transaction.transactionType === 'expense') {
            if (expenseMap[transaction.category]) {
                expenseMap[transaction.category] += transaction.amount;
            } else {
                expenseMap[transaction.category] = transaction.amount;
            }
        }
    });

    transactions.forEach((transaction) => {
        if (transaction.transactionType === 'income') {
            if (incomeMap[transaction.category]) {
                incomeMap[transaction.category] += transaction.amount;
            } else {
                incomeMap[transaction.category] = transaction.amount;
            }
        }
    });

    const expenseLabels = Object.keys(expenseMap);
    const expenseAmounts = Object.values(expenseMap);
    const incomeLabels = Object.keys(incomeMap);
    const incomeAmounts = Object.values(incomeMap);

    const fetchTransactionData = async () => {
        try {
            setIsLoading(true);
            const monthIndex = months.indexOf(selectedMonth) + 1; 
            const response = await axios.post("http://localhost:3000/api/v1/transactions/get",{
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
        fetchTransactionData();
    },[selectedMonth, selectedYear]);
    
    return (
        <Layout>
            <div className="w-full max-w-full px-4 py-6 md:pl-64 lg:pl-72 md:pr-6">
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="w-full sm:w-auto">
                        <h1 className="text-2xl font-bold mb-4">Transaction Analytics</h1>
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
                ) : transactions.length > 0 ? (
                    <div className="space-y-12">
                        {/* Overview chart */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h2 className="text-xl font-semibold mb-6 text-center">Transaction Overview</h2>
                            <div className="max-w-md mx-auto">
                                <Pie data={data} options={{ 
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            labels: {
                                                boxWidth: 12,
                                                padding: 15
                                            }
                                        },
                                        tooltip: {
                                            callbacks: {
                                                label: function(context) {
                                                    const label = context.label || '';
                                                    const value = context.raw as number || 0;
                                                    return `${label}: ₹${value.toFixed(2)}`;
                                                }
                                            }
                                        }
                                    }
                                }} />
                            </div>
                        </div>
                    
                        {/* Category summary cards */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h2 className="text-xl font-semibold mb-6">Category Summary</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {labels.map((category, idx) => (
                                    <div key={category} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 shadow-sm border">
                                        <div className="flex items-center">
                                            <div className="w-4 h-4 mr-3 rounded-full" 
                                                style={{backgroundColor: data.datasets[0].borderColor[idx % data.datasets[0].borderColor.length]}}></div>
                                            <span className="text-sm font-medium truncate max-w-[120px]">{category}</span>
                                        </div>
                                        <span className="font-medium text-right">₹{amounts[idx].toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Income/Expense breakdown charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <h2 className="text-xl font-semibold mb-6 text-center">Expense Breakdown</h2>
                                <div className="max-w-xs mx-auto">
                                    <Pie data={{
                                        labels: expenseLabels,
                                        datasets: [
                                            {
                                                label: 'Expense Amount',
                                                data: expenseAmounts,
                                                backgroundColor: [
                                                    'rgba(255, 99, 132, 0.2)',
                                                    'rgba(54, 162, 235, 0.2)',
                                                    'rgba(255, 206, 86, 0.2)',
                                                    'rgba(75, 192, 192, 0.2)',
                                                    'rgba(153, 102, 255, 0.2)',
                                                    'rgba(255, 159, 64, 0.2)',
                                                ],
                                                borderColor: [
                                                    'rgba(255, 99, 132, 1)',
                                                    'rgba(54, 162, 235, 1)',
                                                    'rgba(255, 206, 86, 1)',
                                                    'rgba(75, 192, 192, 1)',
                                                    'rgba(153, 102, 255, 1)',
                                                    'rgba(255, 159, 64, 1)',
                                                ],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }} 
                                    options={{ 
                                        responsive: true,
                                        maintainAspectRatio: true,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                                labels: {
                                                    boxWidth: 12,
                                                    padding: 12,
                                                    font: {
                                                        size: 11
                                                    }
                                                }
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function(context) {
                                                        const label = context.label || '';
                                                        const value = context.raw as number || 0;
                                                        return `${label}: ₹${value.toFixed(2)}`;
                                                    }
                                                }
                                            }
                                        }
                                    }} />

                                    {expenseLabels.length > 0 ? (
                                        <div className="mt-6 text-center">
                                            <div className="text-xl font-semibold text-red-600">
                                                ₹{expenseAmounts.reduce((sum, amount) => sum + amount, 0).toFixed(2)}
                                            </div>
                                            <div className="text-sm text-gray-500">Total expenses</div>
                                        </div>
                                    ) : (
                                        <div className="mt-6 text-center text-sm text-gray-500">
                                            No expense data for this period
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="bg-white p-6 rounded-lg shadow-sm border">
                                <h2 className="text-xl font-semibold mb-6 text-center">Income Sources</h2>
                                <div className="max-w-xs mx-auto">
                                    <Pie data={{
                                        labels: incomeLabels,
                                        datasets: [
                                            {
                                                label: 'Income Amount',
                                                data: incomeAmounts,
                                                backgroundColor: [
                                                    'rgba(75, 192, 192, 0.2)',
                                                    'rgba(153, 102, 255, 0.2)',
                                                    'rgba(255, 159, 64, 0.2)',
                                                    'rgba(255, 99, 132, 0.2)',
                                                    'rgba(54, 162, 235, 0.2)',
                                                    'rgba(255, 206, 86, 0.2)',
                                                ],
                                                borderColor: [
                                                    'rgba(75, 192, 192, 1)',
                                                    'rgba(153, 102, 255, 1)',
                                                    'rgba(255, 159, 64, 1)',
                                                    'rgba(255, 99, 132, 1)',
                                                    'rgba(54, 162, 235, 1)',
                                                    'rgba(255, 206, 86, 1)',
                                                ],
                                                borderWidth: 1,
                                            },
                                        ],
                                    }} 
                                    options={{ 
                                        responsive: true,
                                        maintainAspectRatio: true,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                                labels: {
                                                    boxWidth: 12,
                                                    padding: 12,
                                                    font: {
                                                        size: 11
                                                    }
                                                }
                                            },
                                            tooltip: {
                                                callbacks: {
                                                    label: function(context) {
                                                        const label = context.label || '';
                                                        const value = context.raw as number || 0;
                                                        return `${label}: ₹${value.toFixed(2)}`;
                                                    }
                                                }
                                            }
                                        }
                                    }} />

                                    {incomeLabels.length > 0 ? (
                                        <div className="mt-6 text-center">
                                            <div className="text-xl font-semibold text-green-600">
                                                ₹{incomeAmounts.reduce((sum, amount) => sum + amount, 0).toFixed(2)}
                                            </div>
                                            <div className="text-sm text-gray-500">Total income</div>
                                        </div>
                                    ) : (
                                        <div className="mt-6 text-center text-sm text-gray-500">
                                            No income data for this period
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center bg-white p-12 rounded-lg shadow-sm border mt-8">
                        <h2 className="text-lg font-semibold">No transactions found for {selectedMonth} {selectedYear}</h2>
                        <p className="text-sm text-gray-500 mt-2">Please add transactions to see analytics.</p>
                    </div>
                )}
            </div>
        </Layout>
    );
};