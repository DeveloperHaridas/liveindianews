
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface LiveChatProps {
  channelId: string;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  time: Date;
}

// Sample messages
const sampleMessages: ChatMessage[] = [
  {
    id: "1",
    user: "NewsWatcher",
    message: "This coverage is amazing!",
    time: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: "2",
    user: "JioFan",
    message: "I can't believe what's happening right now",
    time: new Date(Date.now() - 1000 * 60 * 4)
  },
  {
    id: "3",
    user: "TVLover",
    message: "Does anyone know when the debate starts?",
    time: new Date(Date.now() - 1000 * 60 * 3)
  },
  {
    id: "4",
    user: "PrimeNews",
    message: "The reporter is at the scene now",
    time: new Date(Date.now() - 1000 * 60 * 2)
  },
  {
    id: "5",
    user: "MediaExpert",
    message: "This channel has the best analysis",
    time: new Date(Date.now() - 1000 * 60 * 1)
  }
];

export function LiveChat({ channelId }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-scroll to bottom on new messages
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    if (newMessage.trim() === "") return;
    
    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      user: "You",
      message: newMessage.trim(),
      time: new Date()
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col border-t h-80 md:h-[400px]">
      <div className="bg-gray-100 border-b px-4 py-2">
        <h3 className="font-medium">Live Chat</h3>
      </div>
      
      <ScrollArea className="flex-grow px-4 py-2" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-2">
              <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center font-medium text-sm">
                {msg.user.charAt(0).toUpperCase()}
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{msg.user}</span>
                  <span className="text-xs text-gray-500">{formatTime(msg.time)}</span>
                </div>
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
        <Input 
          placeholder={isAuthenticated ? "Type your message..." : "Login to chat"}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={!isAuthenticated}
          className="flex-grow"
        />
        <Button type="submit" disabled={!isAuthenticated || newMessage.trim() === ""}>
          Send
        </Button>
      </form>
    </div>
  );
}
