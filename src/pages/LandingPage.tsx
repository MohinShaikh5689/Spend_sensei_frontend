import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ChartBarIcon, 
  ChatBubbleLeftRightIcon, 
  ArrowTrendingUpIcon, 
  WalletIcon,
  SparklesIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <WalletIcon className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold text-foreground">Spend Sensei</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="flex space-x-4">
                <a href="#features" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <a href="#how-it-works" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">How It Works</a>
                <a href="#chat" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">AI Assistant</a>
              </div>
              {!token ? (<div className="ml-6">
                <Button 
                  onClick={() => navigate("/login")}
                  variant="outline" 
                  className="mr-2"
                >
                  Log in
                </Button>
                <Button 
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </Button>
              </div>):null}
            </div>
            
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
              >
                <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-border`}>
          <div className="pt-2 pb-3 space-y-1">
            <a href="#features" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-muted-foreground hover:bg-muted hover:border-border hover:text-foreground">Features</a>
            <a href="#how-it-works" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-muted-foreground hover:bg-muted hover:border-border hover:text-foreground">How It Works</a>
            <a href="#chat" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-muted-foreground hover:bg-muted hover:border-border hover:text-foreground">AI Assistant</a>
          </div>
          {!token ? (<div className="pt-4 pb-3 border-t border-border">
            <div className="flex items-center px-4">
              <Button 
                onClick={() => navigate("/login")} 
                variant="outline" 
                className="w-full mb-2"
              >
                Log in
              </Button>
            </div>
            <div className="flex items-center px-4">
              <Button 
                onClick={() => navigate("/signup")}
                className="w-full"
              >
                Sign up
              </Button>
            </div>
          </div>): null}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-background transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-foreground sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Master your finances</span>{" "}
                  <span className="block text-primary xl:inline">with Spend Sensei</span>
                </h1>
                <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Take control of your financial journey with a smart finance tracker that helps you manage transactions, analyze spending patterns, and get personalized financial guidance through AI.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button 
                      onClick={() => navigate("/signup")} 
                      size="lg"
                      className="w-full flex items-center justify-center px-8 py-3"
                    >
                      Get started
                      <ChevronRightIcon className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
            alt="Finance analytics"
          />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
              Everything you need to master your finances
            </p>
            <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">
              Spend Sensei combines powerful tracking, insightful analytics, and AI guidance to transform your financial management.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-card rounded-lg shadow-md border border-border">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <WalletIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-foreground">Transaction Management</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  Easily track your income and expenses with our intuitive interface. Categorize transactions and get a clear view of your spending habits.
                </p>
              </div>

              <div className="p-6 bg-card rounded-lg shadow-md border border-border">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <ChartBarIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-foreground">Financial Analytics</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  Visualize your finances with powerful charts and reports. Understand your spending patterns and identify areas for improvement.
                </p>
              </div>

              <div className="p-6 bg-card rounded-lg shadow-md border border-border">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <ArrowTrendingUpIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-foreground">Budget Planning</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  Set financial goals and create budgets for different categories. Track your progress and get alerts when you're approaching your limits.
                </p>
              </div>

              <div className="p-6 bg-card rounded-lg shadow-md border border-border">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <ChatBubbleLeftRightIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-foreground">AI Financial Assistant</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  Chat with Spend Sensei AI to get personalized financial advice, add transactions through natural language, or ask questions about your spending.
                </p>
              </div>

              <div className="p-6 bg-card rounded-lg shadow-md border border-border">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <SparklesIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-foreground">Personalized Insights</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  Receive custom recommendations based on your spending habits and financial goals to help optimize your money management.
                </p>
              </div>
              
              <div className="p-6 bg-card rounded-lg shadow-md border border-border">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-lg leading-6 font-medium text-foreground">Multi-Device Access</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  Access your financial data securely from any device. Your information is synced across all platforms for consistent management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">How It Works</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
              Simple steps to financial mastery
            </p>
            <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">
              Getting started with Spend Sensei is quick and easy. Begin your journey to financial wellness today.
            </p>
          </div>

          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-2 text-muted-foreground">
                  <svg className="h-5 w-5 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mx-auto">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-foreground">Create an account</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  Sign up in minutes with just your email address. Set up your profile and customize your financial preferences.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mx-auto">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-foreground">Start tracking finances</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  Add your transactions manually or chat with our AI assistant to add them through natural conversation. Set up budgets for different categories.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground mx-auto">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-foreground">Gain insights & grow</h3>
                <p className="mt-2 text-base text-muted-foreground">
                  Review your financial analytics, chat with the AI advisor for personalized tips, and watch your financial health improve over time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Assistant Section */}
      <div id="chat" className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary font-semibold tracking-wide uppercase">AI Assistant</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
              Meet your financial companion
            </p>
            <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">
              Chat with Spend Sensei's AI assistant for financial advice or to quickly add transactions.
            </p>
          </div>

          <div className="mt-10 flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-1/2">
              <div className="bg-card rounded-lg shadow-xl overflow-hidden border border-border">
                <div className="bg-primary p-4 text-primary-foreground">
                  <div className="flex items-center">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2" />
                    <h3 className="text-lg font-medium">Spend Sensei AI Chat</h3>
                  </div>
                </div>
                <div className="p-4 bg-muted h-80 overflow-y-auto">
                  <div className="flex justify-start mb-4">
                    <div className="bg-card rounded-lg p-3 shadow-sm max-w-xs">
                      <p className="text-sm">Hi there! I'm your Spend Sensei assistant. How can I help you today?</p>
                    </div>
                  </div>
                  <div className="flex justify-end mb-4">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 shadow-sm max-w-xs">
                      <p className="text-sm">I spent $45 on dinner yesterday</p>
                    </div>
                  </div>
                  <div className="flex justify-start mb-4">
                    <div className="bg-card rounded-lg p-3 shadow-sm max-w-xs">
                      <p className="text-sm">I've added a $45 transaction for dinner to your expenses. Would you like to categorize it as "Food" or something else?</p>
                    </div>
                  </div>
                  <div className="flex justify-end mb-4">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3 shadow-sm max-w-xs">
                      <p className="text-sm">Yes, Food is good</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-card rounded-lg p-3 shadow-sm max-w-xs">
                      <p className="text-sm">Great! I've categorized your $45 dinner expense as "Food". Your transaction has been saved successfully.</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <div className="flex border rounded-md overflow-hidden">
                        <div className="bg-accent px-3 py-2 border-r flex items-center">
                          <span className="text-xs text-accent-foreground font-medium">Add Transaction</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent-foreground ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input type="text" placeholder="Type your message..." className="w-full px-3 py-2 outline-none bg-transparent" disabled />
                      </div>
                    </div>
                    <button className="ml-2 bg-primary text-primary-foreground rounded-full p-2 flex-shrink-0" disabled>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Two powerful modes in one chat</h3>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/20 text-primary">
                      <ChatBubbleLeftRightIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-foreground">Financial Advisor</h4>
                    <p className="mt-2 text-base text-muted-foreground">
                      Get personalized financial advice, spending recommendations, and answers to your money questions through natural conversation.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-foreground">Transaction Helper</h4>
                    <p className="mt-2 text-base text-muted-foreground">
                      Simply tell the AI about your expenses or income in plain language, and it will add transactions to your account quickly and accurately.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent/50 text-accent-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-foreground">Smart Insights</h4>
                    <p className="mt-2 text-base text-muted-foreground">
                      The AI analyzes your spending patterns to provide insights and suggestions tailored to your financial habits and goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
            <span className="block">Ready to take control of your finances?</span>
            <span className="block text-primary-foreground/80">Start your journey with Spend Sensei today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button 
                onClick={() => navigate("/signup")}
                size="lg"
                variant="secondary"
                className="py-4 px-6"
              >
                Get started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          {/* Sensei Wisdom Banner */}
          <div className="mb-12 p-6 bg-primary/10 rounded-lg border border-primary/20 text-center">
            <p className="text-lg font-medium italic text-foreground">
              "{/* Random sensei quote */}
              { [
                "The path to wealth begins with a single coin saved.",
                "True financial mastery comes not from earning more, but spending wisely.",
                "As the bamboo grows slowly before shooting up, so too must your savings grow before prosperity.",
                "He who tracks every expense finds the path to abundance.",
                "Like the flowing river shapes the canyon, consistent habits shape your financial destiny.",
                "Balance in all things - your budget, your investments, your life.",
              ][Math.floor(Math.random() * 6)] }
            </p>
            <p className="mt-2 text-sm text-muted-foreground">- Spend Sensei</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center">
                <WalletIcon className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold">Spend Sensei</span>
              </div>
              <p className="mt-4 text-muted-foreground text-sm">
                Your personal finance companion for better money management and financial growth.
              </p>
              
              {/* Social Media Links */}
              <div className="mt-6 flex space-x-4">
                <a href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://github.com/MohinShaikh5689" className="text-muted-foreground hover:text-primary transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://linkedin.com" className="text-muted-foreground hover:text-primary transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="https://discord.com" className="text-muted-foreground hover:text-primary transition-colors">
                  <span className="sr-only">Discord</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">Features</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#features" className="text-base text-muted-foreground hover:text-foreground">Transaction Management</a>
                </li>
                <li>
                  <a href="#features" className="text-base text-muted-foreground hover:text-foreground">Financial Analytics</a>
                </li>
                <li>
                  <a href="#chat" className="text-base text-muted-foreground hover:text-foreground">AI Assistant</a>
                </li>
                <li>
                  <a href="#features" className="text-base text-muted-foreground hover:text-foreground">Budget Planning</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-muted-foreground hover:text-foreground">About</a>
                </li>
                <li>
                  <a href="#" className="text-base text-muted-foreground hover:text-foreground">Privacy</a>
                </li>
                <li>
                  <a href="#" className="text-base text-muted-foreground hover:text-foreground">Terms of Service</a>
                </li>
                <li>
                  <a href="#" className="text-base text-muted-foreground hover:text-foreground">Contact</a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Daily Financial Tip */}
          <div className="mt-12 border-t border-border pt-8 pb-4">
            <div className="flex items-center justify-center mb-4">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <SparklesIcon className="h-4 w-4 text-primary" />
              </div>
              <h4 className="text-sm font-medium">SENSEI TIP OF THE DAY</h4>
            </div>
            <p className="text-center text-sm text-muted-foreground italic">
              "{ [
                "Small daily investments yield great future returns. Start now, no matter how little.",
                "Like a bonsai tree, trim unnecessary expenses to shape your financial future.",
                "A journey of a thousand miles begins with one step. Your financial journey starts with one tracked expense.",
                "The wise warrior knows both their strengths and weaknesses. Know your spending habits.",
                "Even the mightiest oak began as a tiny acorn. Your savings will grow with patience.",
              ][Math.floor(Math.random() * 5)] }"
            </p>
          </div>
          
          <div className="mt-6 border-t border-border pt-8">
            <p className="text-base text-muted-foreground text-center">
              &copy; {new Date().getFullYear()} Spend Sensei. All rights reserved.
            </p>

            <p className="text-base text-muted-foreground text-center mt-2">
              Built with ❤️ and ☕ by <a href='https://github.com/MohinShaikh5689' className="text-primary hover:underline"> Mohin</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};