
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LiveTVChannels } from "@/components/live-tv/LiveTVChannels";
import { ChannelPlayer } from "@/components/live-tv/ChannelPlayer";
import { LiveChat } from "@/components/live-tv/LiveChat";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LiveTV = () => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {selectedChannel ? (
        <div className="flex flex-col flex-grow">
          <div className="bg-red-700 text-white py-4 px-4 flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white mr-2"
              onClick={() => setSelectedChannel(null)}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-medium">Live TV</h1>
          </div>
          
          <div className="flex-grow flex flex-col">
            <ChannelPlayer channelId={selectedChannel} />
            <LiveChat channelId={selectedChannel} />
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          
          <main className="flex-grow container mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-6">Browse by channels</h2>
            <LiveTVChannels onSelectChannel={setSelectedChannel} />
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
};

export default LiveTV;
