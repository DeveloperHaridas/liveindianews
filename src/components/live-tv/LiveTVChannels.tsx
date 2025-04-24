
import { useState } from "react";
import { channels } from "@/data/channelsData";

interface LiveTVChannelsProps {
  onSelectChannel: (channelId: string) => void;
}

export function LiveTVChannels({ onSelectChannel }: LiveTVChannelsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 md:gap-6">
      {channels.map((channel) => (
        <div 
          key={channel.id} 
          className="flex flex-col items-center"
          onClick={() => onSelectChannel(channel.id)}
        >
          <div className="bg-white rounded-xl shadow-md p-4 w-full aspect-square flex items-center justify-center hover:shadow-lg transition-shadow cursor-pointer">
            <img 
              src={channel.logoUrl} 
              alt={`${channel.name} logo`} 
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <p className="mt-2 text-center font-medium">{channel.name}</p>
          {channel.subtitle && <p className="text-sm text-gray-600 text-center">{channel.subtitle}</p>}
        </div>
      ))}
    </div>
  );
}
