
import { Crown } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Crown className="h-8 w-8 text-jiohighlight" />
      <div className="flex flex-col items-start">
        <span className="text-xl font-bold bg-gradient-to-r from-jiohighlight to-blue-600 bg-clip-text text-transparent">
          Live India News
        </span>
        <span className="text-xs text-gray-500 font-medium">Premium News Network</span>
      </div>
    </div>
  );
}
