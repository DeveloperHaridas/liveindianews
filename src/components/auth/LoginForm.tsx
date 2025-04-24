
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      login();
      toast({
        title: "Success!",
        description: "You have been logged in successfully.",
      });
      navigate("/premium");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    // Simulate social login
    setTimeout(() => {
      login(provider);
      toast({
        title: "Success!",
        description: `You have been logged in with ${provider} successfully.`,
      });
      navigate("/premium");
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to access premium content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-jiohighlight hover:underline">
                Forgot?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-jioblue hover:bg-jioblue-light" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            onClick={() => handleSocialLogin("Google")}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Google
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleSocialLogin("Facebook")}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Facebook
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-jiohighlight hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
