import Layout from "@/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
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
} from "@/components/ui/popover";

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


export const BudgetPage = () => {

    const [budget, setBudget] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        _id: "",
        description: "",
        category: "",
        amount: 0,
    });
    const [budgetForm, setBudgetForm] = useState({
        description: "",
        category: "",
        amount: 0,
    });
    const [isCardVisible, setIsCardVisible] = useState(false);
    const token = localStorage.getItem("token");

    const categoryColors: Record<string, string> = {
        food: "bg-orange-100 text-orange-600",
        transportation: "bg-amber-100 text-amber-600",
        entertainment: "bg-pink-100 text-pink-600",
        health: "bg-green-100 text-green-600",
        education: "bg-cyan-100 text-cyan-600",
        shopping: "bg-violet-100 text-violet-600",
        grocery: "bg-lime-100 text-lime-600",
        other: "bg-gray-100 text-gray-600",
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "MMM dd, yyyy");
        } catch (error) {
            return dateString;
        }
    };

    const fetchBudget = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/v1/budget", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBudget(response.data);
        } catch (error) {
           alert("Error fetching transactions:", error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchBudget();
    }, []);

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/v1/budget/${formData._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setBudget((prevBudget) =>
                    prevBudget.map((transaction) =>
                        transaction._id === formData._id ? { ...transaction, ...formData } : transaction
                    )
                );
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Error updating transaction:", error);
            }
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/v1/budget/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setBudget((prevBudget) => prevBudget.filter((transaction) => transaction._id !== id));
            }
        } catch (error) {
            alert("Error deleting transaction:", error.response.data.message);
        }
    }

    const handleCardVisiblity = () => {
        setIsCardVisible(!isCardVisible);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/v1/budget", budgetForm, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
               fetchBudget();
                setBudgetForm({
                    description: "",
                    category: "other",
                    amount: 0,
                });
                setIsCardVisible(false);
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                setIsCardVisible(false);
                alert(error.response.data.message);
            } 
        }
        
    }

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
                    onChange={(e) => setBudgetForm({ ...budgetForm, description: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Amount"
                    className="mb-4"
                    required
                    onChange={(e) => setBudgetForm({ ...budgetForm, amount: parseFloat(e.target.value) })}
                  />

                  <Select
                    defaultValue="other"
                    onValueChange={(value) => setBudgetForm({ ...budgetForm, category: value })}
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
                <div className="max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold mb-6">Budget</h1>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                            <Button className="flex items-center gap-2" onClick={handleCardVisiblity}>
                                <Plus size={16} /> Add Transaction
                            </Button>
                        </div>

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
                                            : budget.length === 0
                                                ? "No transactions found"
                                                : `Showing ${budget.length} transaction${budget.length !== 1 ? 's' : ''}`
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
                                        ) : budget.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-24 text-center">
                                                    No transactions found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            budget.map((transaction) => (
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
                                                                        amount: transaction.amount,
                                                                    });
                                                                }}
                                                            >Edit</PopoverTrigger>
                                                            <PopoverContent>
                                                                <div className="p-4">
                                                                    <h3 className="text-lg font-semibold">Edit Transaction</h3>
                                                                    <form className="mt-4" onClick={handleEdit}>
                                                                        <Input
                                                                            type="text"
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
                                                        <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(transaction._id)}>Delete</button>
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
}