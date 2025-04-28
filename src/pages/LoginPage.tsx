import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { WalletIcon, LockIcon, MailIcon, ArrowRightIcon, CheckCircleIcon } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
        const response = await axios.post('http://localhost:3000/api/v1/users/login', { email, password });
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('name', response.data.name);
        navigate('/dashboard');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 flex flex-col lg:flex-row overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-primary/30 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-secondary/20 rounded-full filter blur-3xl"></div>
      </div>
      
      {/* Left side - Hero/Brand section */}
      <div className="lg:w-1/2 bg-primary/95 text-primary-foreground relative flex flex-col justify-center p-8 lg:p-16 overflow-hidden">
        {/* Abstract shapes for visual interest */}
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 border border-primary-foreground/10 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 border border-primary-foreground/10 rounded-full"></div>
          <div className="absolute top-1/4 left-1/3 w-64 h-64 border border-primary-foreground/20 rounded-full"></div>
        </div>

        <div className="max-w-lg relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary-foreground/20 backdrop-blur-sm rounded-xl mb-8 shadow-xl">
            <WalletIcon size={32} className="text-primary-foreground" />
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 tracking-tight">Spend Sensei</h1>
          
          <p className="text-xl mb-10 leading-relaxed text-primary-foreground/90">
            Take control of your finances with intelligent tracking, budgeting, and insights.
          </p>
          
          <div className="space-y-8">
            {[
              {
                title: "Smart Expense Tracking",
                description: "Real-time monitoring of your spending with AI-powered categorization.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Insightful Analytics",
                description: "Visualize your financial health with intuitive charts and dashboards.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                )
              },
              {
                title: "Smart Budget Planning",
                description: "Create personalized budgets with alerts to stay on track.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="bg-primary-foreground/20 p-2 rounded-full transform transition-transform group-hover:scale-110 backdrop-blur-sm shadow-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-primary-foreground/80">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="lg:w-1/2 flex flex-col justify-center p-8 lg:p-16 relative z-10">
        <div className="w-full max-w-md mx-auto">
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="bg-primary p-2 rounded-lg shadow-lg">
              <WalletIcon className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="ml-3 text-2xl font-bold text-foreground">
              Spend Sensei
            </h2>
          </div>

          <Card className="border-none shadow-2xl bg-background/70 backdrop-blur-sm">
            <CardContent className="pt-6 pb-8 px-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back</h2>
                <p className="text-muted-foreground">Sign in to access your account</p>
              </div>
              
              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border-l-4 border-destructive rounded-md">
                  <p className="text-sm text-destructive font-medium">{error}</p>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MailIcon className="h-4 w-4 text-primary" /> Email address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="bg-background/50 backdrop-blur-sm border-input/50 focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <LockIcon className="h-4 w-4 text-primary" /> Password
                    </label>
                    <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-background/50 backdrop-blur-sm border-input/50 focus:border-primary"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full shadow-lg hover:shadow-primary/25"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <Separator />
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-background text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Button variant="outline" type="button" className="bg-background/50 backdrop-blur-sm hover:bg-background/70">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </Button>

                  <Button variant="outline" type="button" className="bg-background/50 backdrop-blur-sm hover:bg-background/70">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#1DA1F2]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.8 10.5C13.8 7.46243 16.2624 5 19.3 5C22.3376 5 24.8 7.46243 24.8 10.5C24.8 13.5376 22.3376 16 19.3 16C18.4876 16 17.7128 15.8142 17 15.4811L13 17V12.9646C13.2949 12.2043 13.8 11.3888 13.8 10.5Z" fill="#1877F2"/>
                      <path d="M11 8.14286C11 4.18571 14.1857 1 18.1429 1C22.1 1 25.2857 4.18571 25.2857 8.14286C25.2857 12.1 22.1 15.2857 18.1429 15.2857C17.6318 15.2857 17.1316 15.2338 16.6454 15.1343L13 17L13 13.6407C11.7359 12.2693 11 10.2951 11 8.14286Z" fill="#0866FF"/>
                      <path d="M13.7143 7.00009C13.7143 3.77106 16.342 1.14293 19.5714 1.14293C22.8009 1.14293 25.4286 3.77106 25.4286 7.00009C25.4286 10.229 22.8009 12.8572 19.5714 12.8572C19.0238 12.8572 18.4893 12.7879 17.98 12.6573L14 14.8572V10.0943C13.8205 9.2445 13.7143 8.39506 13.7143 7.00009Z" fill="#0867FF"/>
                      <path d="M4.42857 14.2857C2.53502 14.2857 1 12.7507 1 10.8571C1 9.20652 2.1189 7.80893 3.67143 7.51961V7.46429C3.67143 5.57074 5.20645 4.03571 7.1 4.03571C8.99355 4.03571 10.5286 5.57074 10.5286 7.46429V14.2857H4.42857Z" fill="url(#paint0_radial)"/>
                      <path d="M10.5286 7.46429C10.5286 5.57074 8.99354 4.03571 7.1 4.03571C5.20645 4.03571 3.67143 5.57074 3.67143 7.46429V7.51961C2.1189 7.80893 1 9.20652 1 10.8571C1 12.7507 2.53502 14.2857 4.42857 14.2857H10.5286V7.46429Z" fill="white"/>
                      <path d="M19.5 9.92857C20.6672 9.92857 21.6071 8.98864 21.6071 7.82143C21.6071 6.65422 20.6672 5.71429 19.5 5.71429C18.3328 5.71429 17.3929 6.65422 17.3929 7.82143C17.3929 8.98864 18.3328 9.92857 19.5 9.92857Z" fill="white"/>
                      <defs>
                        <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.1 9.16071) rotate(180) scale(6.1 6.1)">
                          <stop stop-color="#0866FF"/>
                          <stop offset="1" stop-color="#0866FF" stop-opacity="0"/>
                        </radialGradient>
                      </defs>
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/signup" className="font-medium text-primary hover:text-primary/80 transition">
                    Sign up now
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition">Privacy Policy</a>
            <span className="text-muted-foreground/50">•</span>
            <a href="#" className="hover:text-foreground transition">Terms of Service</a>
            <span className="text-muted-foreground/50">•</span>
            <a href="#" className="hover:text-foreground transition">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;