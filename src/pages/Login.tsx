
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto mb-8 text-center">
          <h1 className="text-3xl font-bold">Sign in to Live India News</h1>
          <p className="text-gray-600 mt-2">Access premium content and personalized news</p>
        </div>
        
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
};

export default Login;
