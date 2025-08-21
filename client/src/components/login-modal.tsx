import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate a brief loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    if (password === "MissyAlfie16") {
      toast({
        title: "Welcome!",
        description: "Successfully logged in to Ainsworth Farm Cattery admin.",
      });
      // Redirect to admin page
      window.location.href = "/admin";
    } else {
      toast({
        title: "Login Failed",
        description: "Incorrect password. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
    setPassword("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="text-gray-500 hover:text-sage-700 px-4 py-2 text-xs font-medium transition-all duration-300 hover:bg-sage-50 rounded-md border border-sage-200"
        >
          Login
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white border-sage-200">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-sage-100 rounded-full">
            <Lock className="w-8 h-8 text-sage-600" />
          </div>
          <DialogTitle className="text-center text-2xl font-serif text-gray-900">
            Admin Login
          </DialogTitle>
          <p className="text-center text-sm text-gray-600">
            Enter the admin password to access the dashboard
          </p>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 border-sage-200 focus:border-sage-400 focus:ring-sage-400"
                placeholder="Enter admin password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-sage-600 hover:bg-sage-700 text-white font-medium py-2.5 transition-all duration-300"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </div>
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Access restricted to authorized personnel only
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}