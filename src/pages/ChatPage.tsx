import Layout from "@/layout/layout";
import { MessageSquare, PlusCircle, Send, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatMessage {
    _id?: string;
    message?: string;
    user?: string;
    botReply?: string;
    createdAt?: string;
}

export const ChatPage = () => {
    const [selectedOption, setSelectedOption] = useState<string>("advisor");
    const [messages, setMessages] = useState<ChatMessage[]>([
        { botReply: "Hello! How can I help you today? You can select a mode from the dropdown menu. If you want to add transaction you have to give proper discription eg: I purchased Bag of 100$" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const baseUrl = "https://spend-sensei-backend.onrender.com"

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        setIsLoading(true);

        try {
            const endpoint = selectedOption === "advisor"
                ? `${baseUrl}/api/v1/budget/financial-advisor`
                : `${baseUrl}/api/v1/budget/chat`;

            const response = await axios.post(endpoint, {
                message: inputValue,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setInputValue("");
            fetchChat(); 
        } catch (error:any) {
           alert(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchChat = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${baseUrl}/api/v1/budget/chats`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            response.data.unshift({ botReply: "Hello! How can I help you today? You can select a mode from the dropdown menu. If you want to add transaction you have to give proper discription eg: I purchased Bag of 100$" });

            setMessages(response.data);

        } catch (error:any) {
            if (error.response.data.message === "No chats found") {
                setMessages([
                    { botReply: "Hello! How can I help you today? You can select a mode from the dropdown menu. If you want to add transaction you have to give proper discription eg: I purchased Bag of 100$" }
                ]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    useEffect(() => {
        fetchChat();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    return (
        <Layout>
            <div className="w-full md:pl-64 lg:pl-72 h-screen flex flex-col">
                <div className="p-4 border-b">
                    <h1 className="text-2xl font-bold">Ask Sensei</h1>
                    <p className="text-sm text-muted-foreground">Get financial advice by Sensei or add transactions quickly</p>
                </div>

                <div className="flex-grow overflow-y-auto p-4 flex flex-col">
                    <div className="flex-grow space-y-4">

                        {messages.map((message, index) => (
                            <div key={index} className="space-y-2">
                                {message.message && (
                                    <div className="flex justify-end">
                                        <div className="bg-primary text-white max-w-[75%] rounded-lg p-3">
                                            {message.message}
                                        </div>
                                    </div>
                                )}
                                {message.botReply && (
                                    <div className="flex justify-start">
                                        <div className="bg-muted text-foreground max-w-[75%] rounded-lg p-3">
                                            <ReactMarkdown>
                                                {message.botReply}
                                            </ReactMarkdown>    
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {messages.length === 0 && !isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-muted text-foreground max-w-[75%] rounded-lg p-3">
                                    No messages yet. Start the conversation!
                                </div>
                            </div>
                        )
                        }

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-muted text-foreground max-w-[75%] rounded-lg p-3 flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <div className="p-4 border-t">
                    <div className="flex space-x-2 items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex items-center gap-2 w-40">
                                    {selectedOption === "advisor" ? (
                                        <>
                                            <MessageSquare className="h-4 w-4 text-primary" />
                                            <span>Financial Advisor</span>
                                        </>
                                    ) : (
                                        <>
                                            <PlusCircle className="h-4 w-4 text-green-500" />
                                            <span>Add Transaction</span>
                                        </>
                                    )}
                                    <ChevronDown className="h-4 w-4 ml-auto" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                <DropdownMenuItem
                                    onClick={() => setSelectedOption("advisor")}
                                    className="flex items-center gap-2"
                                >
                                    <MessageSquare className="h-4 w-4 text-primary" />
                                    <span>Financial Advisor</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => setSelectedOption("transaction")}
                                    className="flex items-center gap-2"
                                >
                                    <PlusCircle className="h-4 w-4 text-green-500" />
                                    <span>Add Transaction</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={
                                selectedOption === "advisor"
                                    ? "Ask for financial advice..."
                                    : "Describe your transaction..."
                            }
                            className="flex-grow"
                            disabled={isLoading}
                        />
                        <Button
                            onClick={handleSendMessage}
                            disabled={isLoading || !inputValue.trim()}
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};