import Layout from "@/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


interface Transaction {
    _id: string;
    amount: number;
    category: string;
    description: string;
    transactionType: string;
    date: string;
}

// Category colors map
const categoryColors: Record<string, string> = {
    salary: 'bg-blue-100 text-blue-600',
    business: 'bg-indigo-100 text-indigo-600',
    investment: 'bg-purple-100 text-purple-600',
    food: 'bg-orange-100 text-orange-600',
    transportation: 'bg-amber-100 text-amber-600',
    entertainment: 'bg-pink-100 text-pink-600',
    health: 'bg-green-100 text-green-600',
    education: 'bg-cyan-100 text-cyan-600',
    shopping: 'bg-violet-100 text-violet-600',
    grocery: 'bg-lime-100 text-lime-600',
    'balance forward': 'bg-teal-100 text-teal-600',
    other: 'bg-gray-100 text-gray-600',
};

export const TransactionPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        _id: "",
        description: "",
        category: "",
        transactionType: "",
        amount: 0,
    });
    const token = localStorage.getItem("token");

    const fetchTransactionData = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:3000/api/v1/transactions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTransactions(response.data);
        } catch (error) {
            if(error.response.data.message === "No transactions found") {
                setTransactions([]);
            }
        } finally {
            setIsLoading(false);
        }
    };


    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/v1/transactions/${formData._id}`, {
                description: formData.description,
                category: formData.category,
                transactionType: formData.transactionType,
                amount: formData.amount,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(response.status === 200) {
            setTransactions((prevTransactions) =>(
                prevTransactions.map((transaction)=>
                    transaction._id === formData._id ? { ...transaction, ...formData } : transaction
                )

            ))}
        } catch (error) {
           alert("Error fetching transaction data:", error.response.data.message);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/transactions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setTransactions((prevTransactions) =>
                    prevTransactions.filter((transaction) => transaction._id !== id)
                );
            }
        } catch (error) {
            alert("Error deleting transaction:", error.response.data.message);
        }
    }

    useEffect(() => {
        fetchTransactionData();
    }, []);

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "MMM dd, yyyy");
        } catch (error) {
            return dateString;
        }
    };

    transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());


    return (
        <Layout>
            <div className="w-full md:pl-64 lg:pl-72">
                <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold mb-6">Transactions</h1>

                        <div className="relative mb-6">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <Input
                                placeholder="Search transactions..."
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableCaption className="px-4 py-2">
                                        {isLoading
                                            ? "Loading transactions..."
                                            : transactions.length === 0
                                                ? "No transactions found"
                                                : `Showing ${transactions.length} transaction${transactions.length !== 1 ? 's' : ''}`
                                        }
                                    </TableCaption>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50 dark:bg-gray-800">
                                            <TableHead className="w-[250px] lg:w-[300px]">Description</TableHead>
                                            <TableHead className="w-[120px]">Category</TableHead>
                                            <TableHead className="w-[120px]">Date</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead className="text-right">Amount</TableHead>
                                            <TableHead className="w-[120px] text-center">Operations</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {isLoading ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-24 text-center">
                                                    Loading transactions...
                                                </TableCell>
                                            </TableRow>
                                        ) : transactions.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-24 text-center">
                                                    No transactions found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            transactions.map((transaction) => (
                                                <TableRow
                                                    key={transaction._id}
                                                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                                >
                                                    <TableCell className="font-medium">{transaction.description}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant="outline"
                                                            className={`${categoryColors[transaction.category.toLowerCase()] || categoryColors.other} border-0`}
                                                        >
                                                            {transaction.category}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{formatDate(transaction.date)}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant="outline"
                                                            className={transaction.transactionType === 'income'
                                                                ? 'bg-green-100 text-green-600 border-0'
                                                                : 'bg-red-100 text-red-600 border-0'
                                                            }
                                                        >
                                                            {transaction.transactionType}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell
                                                        className={`text-right font-medium ${transaction.transactionType === 'income'
                                                                ? 'text-green-600'
                                                                : 'text-red-600'
                                                            }`}
                                                    >
                                                        {transaction.transactionType === 'income' ? '+' : '-'}
                                                        ₹{transaction.amount.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Popover>
                                                            <PopoverTrigger 
                                                             className="text-blue-600 hover:text-blue-800"
                                                             onClick={() => {
                                                                 setFormData({
                                                                     _id: transaction._id,
                                                                     description: transaction.description,
                                                                     category: transaction.category,
                                                                     transactionType: transaction.transactionType,
                                                                     amount: transaction.amount,
                                                                 });
                                                             }}
                                                            >Edit</PopoverTrigger>
                                                            <PopoverContent>
                                                                <div className="p-4">
                                                                    <h3 className="text-lg font-semibold">Edit Transaction</h3>
                                                                    <form className="mt-4" onClick={handleEdit}>
                                                                        <Input
                                                                            type = "text"
                                                                            defaultValue={formData._id}
                                                                            className="mb-2"
                                                                            placeholder="Transaction ID"
                                                                            disabled
                                                                            
                                                                        />
                                                                        <Input
                                                                            type="text"
                                                                            placeholder="Description"
                                                                            defaultValue={formData.description}
                                                                            className="mb-2"
                                                                            onChange={(e) => {
                                                                                setFormData({
                                                                                    ...formData,
                                                                                    description: e.target.value
                                                                                });
                                                                            }}
                                                                            
                                                                        />
                                                                           <select
                                                                            name="transactionType"
                                                                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
                                                                            value={formData.category}
                                                                            onChange={(e) => {
                                                                                setFormData({
                                                                                    ...formData,
                                                                                    category: e.target.value
                                                                                });
                                                                                
                                                                            }}
                                                                        >
                                                                            <option value="salary">salary</option>
                                                                            <option value="business">business</option>
                                                                            <option value="investment">investment</option>
                                                                            <option value="food">food</option>
                                                                            <option value="transportation">transportation</option>
                                                                            <option value="entertainment">entertainment</option>
                                                                            <option value="health">health</option>
                                                                            <option value="education">education</option>
                                                                            <option value="shopping">shopping</option>
                                                                            <option value="balance forward">balance forward</option>
                                                                            <option value="other">other</option>
                                                                        </select>
                                                                           <select
                                                                            name="transactionType"
                                                                            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
                                                                            value={formData.transactionType}
                                                                            onChange={(e) => {
                                                                                setFormData({
                                                                                    ...formData,
                                                                                    transactionType: e.target.value
                                                                                });
                                                                                
                                                                            }}
                                                                        >
                                                                            <option value="income">Income</option>
                                                                            <option value="expense">Expense</option>
                                                                        </select>
                                                                        <Input
                                                                            type="number"
                                                                            placeholder="Amount"
                                                                            defaultValue={formData.amount}
                                                                            className="mb-2"
                                                                            onChange={(e) => {
                                                                                setFormData({
                                                                                    ...formData,
                                                                                    amount: parseFloat(e.target.value)
                                                                                });
                                                                               
                                                                            }}
                                                                            
                                                                        />
                                                                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                                                                    </form>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                        <span className="mx-2">|</span>
                                                        <button className="text-red-600 hover:text-red-800" onClick={()=>handleDelete(transaction._id)}>Delete</button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TransactionPage;