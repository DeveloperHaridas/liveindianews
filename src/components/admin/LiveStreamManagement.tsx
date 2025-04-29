import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Edit, Trash2, Video } from "lucide-react";
import { channels } from "@/data/channelsData";

interface Channel {
  id: string;
  name: string;
  description?: string;
  logoUrl: string;
  streamUrl: string;
  category?: string;
  subtitle?: string;
}

export function LiveStreamManagement() {
  const [liveStreams, setLiveStreams] = useState<Channel[]>([]);
  const [currentStream, setCurrentStream] = useState<Channel | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  // Load channels from localStorage or default
  useEffect(() => {
    const storedStreams = localStorage.getItem("adminLiveStreams");
    if (storedStreams) {
      setLiveStreams(JSON.parse(storedStreams));
    } else {
      setLiveStreams(channels);
    }
  }, []);
  
  const handleAddStream = (stream: Omit<Channel, "id">) => {
    const newStream = {
      ...stream,
      id: Date.now().toString(),
    };
    
    const updatedStreams = [...liveStreams, newStream];
    setLiveStreams(updatedStreams);
    
    // Store in localStorage
    localStorage.setItem("adminLiveStreams", JSON.stringify(updatedStreams));
    
    toast({
      title: "Stream Added",
      description: `"${stream.name}" has been added successfully.`,
    });
  };
  
  const handleEditStream = (stream: Channel) => {
    const updatedStreams = liveStreams.map(item => item.id === stream.id ? stream : item);
    setLiveStreams(updatedStreams);
    
    // Update localStorage
    localStorage.setItem("adminLiveStreams", JSON.stringify(updatedStreams));
    
    toast({
      title: "Stream Updated",
      description: `"${stream.name}" has been updated successfully.`,
    });
    setIsEditing(false);
    setCurrentStream(null);
  };
  
  const handleDeleteStream = (id: string) => {
    const updatedStreams = liveStreams.filter(item => item.id !== id);
    setLiveStreams(updatedStreams);
    
    // Update localStorage
    localStorage.setItem("adminLiveStreams", JSON.stringify(updatedStreams));
    
    toast({
      title: "Stream Deleted",
      description: "The live stream has been deleted successfully.",
    });
  };
  
  const handleTestStream = (streamUrl: string) => {
    window.open(streamUrl, "_blank");
    toast({
      title: "Testing Stream",
      description: "Opening stream in a new window",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Live Streams</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Live Stream
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <StreamForm 
              onSubmit={handleAddStream}
              isEditing={false}
              initialData={{
                name: "",
                description: "",
                logoUrl: "",
                streamUrl: "",
                category: "",
                subtitle: ""
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableCaption>List of all live streams</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Channel</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-[200px]">Stream URL</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {liveStreams.map((stream) => (
            <TableRow key={stream.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img 
                    src={stream.logoUrl} 
                    alt={stream.name}
                    className="w-8 h-8 object-contain"
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium">{stream.name}</TableCell>
              <TableCell>{stream.category || "News"}</TableCell>
              <TableCell className="truncate max-w-[200px]">
                <span className="text-xs text-gray-500">{stream.streamUrl}</span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleTestStream(stream.streamUrl)}
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setCurrentStream(stream);
                          setIsEditing(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      {isEditing && currentStream && (
                        <StreamForm 
                          onSubmit={handleEditStream}
                          isEditing={true}
                          initialData={currentStream}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        size="icon"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Delete Live Stream</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this live stream? This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button 
                          type="button" 
                          variant="destructive"
                          onClick={() => handleDeleteStream(stream.id)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

interface StreamFormProps {
  onSubmit: (stream: any) => void;
  isEditing: boolean;
  initialData: Omit<Channel, "id"> & Partial<Pick<Channel, "id">>;
}

function StreamForm({ onSubmit, isEditing, initialData }: StreamFormProps) {
  const [formData, setFormData] = useState(initialData);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit Live Stream" : "Add Live Stream"}</DialogTitle>
        <DialogDescription>
          {isEditing 
            ? "Update the details of this live stream." 
            : "Fill in the details to add a new live stream."}
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Channel Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              placeholder="News, Sports, etc."
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subtitle">Subtitle/Tagline</Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={formData.subtitle || ""}
            onChange={handleChange}
            placeholder="24x7 News Channel"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="logoUrl">Logo URL</Label>
          <Input
            id="logoUrl"
            name="logoUrl"
            type="url"
            value={formData.logoUrl}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="streamUrl">Stream URL</Label>
          <Input
            id="streamUrl"
            name="streamUrl"
            type="url"
            value={formData.streamUrl}
            onChange={handleChange}
            placeholder="https://example.com/stream"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Write a brief description about this channel..."
          />
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">
            {isEditing ? "Update Stream" : "Add Stream"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
