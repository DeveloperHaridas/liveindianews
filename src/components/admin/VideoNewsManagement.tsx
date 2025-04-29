import { useState, useRef } from "react";
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
import { PlusCircle, Edit, Trash2, Video, Upload } from "lucide-react";

// Sample video news data
const sampleVideoNews = [
  { 
    id: "1", 
    title: "Breaking: Major Political Developments", 
    category: "Politics",
    duration: "2:45",
    thumbnailUrl: "https://images.unsplash.com/photo-1554177255-61502b352de3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    videoUrl: "https://example.com/video1.mp4",
    date: "2025-04-25",
    source: "JioNews"
  },
  { 
    id: "2", 
    title: "Tech Innovation: New AI Breakthrough", 
    category: "Technology",
    duration: "3:12",
    thumbnailUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    videoUrl: "https://example.com/video2.mp4",
    date: "2025-04-24",
    source: "Tech Today"
  },
  { 
    id: "3", 
    title: "Sports Highlights: Weekend Tournament", 
    category: "Sports",
    duration: "1:58",
    thumbnailUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    videoUrl: "https://example.com/video3.mp4",
    date: "2025-04-23",
    source: "Sports Network"
  },
];

interface VideoNews {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  date: string;
  description?: string;
  source?: string; // Added source field
}

export function VideoNewsManagement() {
  const [videoNews, setVideoNews] = useState<VideoNews[]>(sampleVideoNews);
  const [currentVideo, setCurrentVideo] = useState<VideoNews | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  const handleAddVideo = (video: Omit<VideoNews, "id">) => {
    const newVideo = {
      ...video,
      id: Date.now().toString(),
    };
    
    setVideoNews([...videoNews, newVideo]);
    
    // Store in localStorage to persist changes
    localStorage.setItem("videoNewsData", JSON.stringify([...videoNews, newVideo]));
    
    toast({
      title: "Video Added",
      description: `"${video.title}" has been added successfully.`,
    });
  };
  
  const handleEditVideo = (video: VideoNews) => {
    setVideoNews(videoNews.map(item => item.id === video.id ? video : item));
    
    // Update localStorage
    localStorage.setItem("videoNewsData", JSON.stringify(
      videoNews.map(item => item.id === video.id ? video : item)
    ));
    
    toast({
      title: "Video Updated",
      description: `"${video.title}" has been updated successfully.`,
    });
    setIsEditing(false);
    setCurrentVideo(null);
  };
  
  const handleDeleteVideo = (id: string) => {
    const updatedVideos = videoNews.filter(item => item.id !== id);
    setVideoNews(updatedVideos);
    
    // Update localStorage
    localStorage.setItem("videoNewsData", JSON.stringify(updatedVideos));
    
    toast({
      title: "Video Deleted",
      description: "The video has been deleted successfully.",
    });
  };
  
  const handlePreviewVideo = (videoUrl: string) => {
    window.open(videoUrl, "_blank");
    toast({
      title: "Playing Video",
      description: "Opening video in a new window",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Video News</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Video
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <VideoForm 
              onSubmit={handleAddVideo}
              isEditing={false}
              initialData={{
                title: "",
                category: "",
                duration: "",
                thumbnailUrl: "",
                videoUrl: "",
                date: new Date().toISOString().split('T')[0],
                description: "",
                source: "" // Added source field
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableCaption>List of all video news</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Source</TableHead> {/* Added Source column */}
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videoNews.map((video) => (
            <TableRow key={video.id}>
              <TableCell>
                <img 
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-16 h-10 object-cover rounded"
                />
              </TableCell>
              <TableCell className="font-medium">{video.title}</TableCell>
              <TableCell>{video.category}</TableCell>
              <TableCell>{video.source || "—"}</TableCell> {/* Display source */}
              <TableCell>{video.date}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handlePreviewVideo(video.videoUrl)}
                  >
                    <Video className="h-4 w-4" />
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setCurrentVideo(video);
                          setIsEditing(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      {isEditing && currentVideo && (
                        <VideoForm 
                          onSubmit={handleEditVideo}
                          isEditing={true}
                          initialData={currentVideo}
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
                        <DialogTitle>Delete Video</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this video? This action cannot be undone.
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
                          onClick={() => handleDeleteVideo(video.id)}
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

interface VideoFormProps {
  onSubmit: (video: any) => void;
  isEditing: boolean;
  initialData: Omit<VideoNews, "id"> & Partial<Pick<VideoNews, "id">>;
}

function VideoForm({ onSubmit, isEditing, initialData }: VideoFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(initialData.thumbnailUrl || null);
  
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setThumbnailFile(file);
      
      // Create a preview URL for the thumbnail
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
        // Update formData with the data URL
        setFormData({ ...formData, thumbnailUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setVideoFile(file);
      
      // For video, we'll use a data URL or a local blob URL
      const videoUrl = URL.createObjectURL(file);
      setFormData({ ...formData, videoUrl });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit Video News" : "Add Video News"}</DialogTitle>
        <DialogDescription>
          {isEditing 
            ? "Update the details of this video." 
            : "Fill in the details to add a new video news item."}
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="Politics, Sports, etc."
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              placeholder="e.g. 2:45"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Add Source field */}
        <div className="space-y-2">
          <Label htmlFor="source">Source (News Company Name)</Label>
          <Input
            id="source"
            name="source"
            value={formData.source || ""}
            onChange={handleChange}
            placeholder="e.g. JioNews, CNN, BBC"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="thumbnailInput">Thumbnail</Label>
          <div className="flex items-center gap-2">
            <Button 
              type="button" 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => thumbnailInputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
              Select Thumbnail
            </Button>
            <Input
              ref={thumbnailInputRef}
              id="thumbnailInput"
              name="thumbnailInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnailSelect}
            />
            <span className="text-sm text-gray-500">
              {thumbnailFile?.name || (thumbnailPreview && !thumbnailFile ? "Current thumbnail" : "No thumbnail selected")}
            </span>
          </div>
          
          {thumbnailPreview && (
            <div className="mt-2">
              <img 
                src={thumbnailPreview} 
                alt="Thumbnail Preview" 
                className="max-h-40 rounded-md object-cover"
              />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="videoInput">Video</Label>
          <div className="flex items-center gap-2">
            <Button 
              type="button" 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => videoInputRef.current?.click()}
            >
              <Video className="h-4 w-4" />
              Select Video
            </Button>
            <Input
              ref={videoInputRef}
              id="videoInput"
              name="videoInput"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleVideoSelect}
            />
            <span className="text-sm text-gray-500">
              {videoFile?.name || (formData.videoUrl && !videoFile ? "Current video" : "No video selected")}
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Write a brief description about this video..."
          />
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">
            {isEditing ? "Update Video" : "Add Video"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
