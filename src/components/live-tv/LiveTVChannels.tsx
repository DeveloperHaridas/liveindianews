
import { useState } from "react";
import { channels as defaultChannels } from "@/data/channelsData";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  logoUrl: string;
  streamUrl: string;
  category?: string;
  subtitle?: string;
}

interface LiveTVChannelsProps {
  onSelectChannel: (channelId: string) => void;
  customChannels?: Channel[];
}

export function LiveTVChannels({ onSelectChannel, customChannels }: LiveTVChannelsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const channels = customChannels || defaultChannels;
  
  const filteredChannels = channels.filter(channel => 
    channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (channel.category && channel.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (channel.subtitle && channel.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <Input
          placeholder="Search channels..."
          className="pl-10"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredChannels.map(channel => (
          <div
            key={channel.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectChannel(channel.id)}
          >
            <div className="w-16 h-16 flex items-center justify-center mb-2">
              <img
                src={channel.logoUrl}
                alt={channel.name}
                className="max-w-full max-h-full"
              />
            </div>
            <h3 className="font-medium text-center">{channel.name}</h3>
            {channel.subtitle && (
              <p className="text-xs text-gray-500 text-center mt-1">{channel.subtitle}</p>
            )}
          </div>
        ))}
      </div>
      
      {filteredChannels.length === 0 && (
        <div className="flex justify-center items-center h-32 border rounded-lg bg-gray-50">
          <p className="text-gray-500">No channels found</p>
        </div>
      )}
    </div>
  );
}
