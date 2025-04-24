
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;
    
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    setEmail("");
  };
  
  return (
    <div className="bg-jioblue rounded-lg p-6 text-white my-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
        <p className="text-gray-300">Subscribe to our newsletter for the latest news updates</p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input 
          type="email" 
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          required
        />
        <Button type="submit" className="bg-jiohighlight hover:bg-jiohighlight-light">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
