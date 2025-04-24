
import { useState } from "react";
import { channels } from "@/data/channelsData";
import { Button } from "@/components/ui/button";
import { MessageSquare, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ChannelPlayerProps {
  channelId: string;
}

export function ChannelPlayer({ channelId }: ChannelPlayerProps) {
  const channel = channels.find(c => c.id === channelId);
  const [isLiked, setIsLiked] = useState(false);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const { toast } = useToast();
  
  if (!channel) return null;
  
  const handleShare = () => {
    toast({
      title: "Share",
      description: `Sharing ${channel.name} live stream`,
    });
  };
  
  return (
    <div className="bg-black w-full">
      <div className="aspect-video max-w-4xl mx-auto">
        <iframe 
          src={channel.streamUrl}
          title={`${channel.name} live stream`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
      </div>
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{channel.name}</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500" : ""}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowChatOnMobile(!showChatOnMobile)}
            >
              <MessageSquare />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 />
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {channel.description || `Watch ${channel.name} live streaming`}
        </p>
      </div>
    </div>
  );
}
