
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Shorts = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">News Shorts</h1>
        
        <div className="flex items-center justify-center h-64 border rounded-lg">
          <p className="text-lg text-gray-500">Short video news coming soon!</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shorts;
