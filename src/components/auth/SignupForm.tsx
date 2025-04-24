
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

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate signup
    setTimeout(() => {
      login();
      toast({
        title: "Success!",
        description: "Your account has been created.",
      });
      navigate("/premium");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSocialSignup = (provider: string) => {
    setIsLoading(true);
    
    // Simulate social signup
    setTimeout(() => {
      login(provider);
      toast({
        title: "Account created!",
        description: `You have signed up with ${provider} successfully.`,
      });
      navigate("/premium");
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Sign up to access premium content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <Label htmlFor="password">Password</Label>
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
            {isLoading ? "Creating account..." : "Create account"}
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
            onClick={() => handleSocialSignup("Google")}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Google
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handleSocialSignup("Facebook")}
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
          Already have an account?{" "}
          <Link to="/login" className="text-jiohighlight hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
