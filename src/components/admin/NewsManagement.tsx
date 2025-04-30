import { useState, useEffect, useRef } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Edit, Trash2, Upload } from "lucide-react";
import news from "@/data/newsData";

// Extract all unique categories from the news data
const availableCategories = Array.from(
  new Set(news.map(item => item.category))
).sort();

// Sample news data
const sampleNews = news.slice(0, 5).map(item => ({
  id: Number(item.id),
  title: item.headline,
  source: item.source || item.category, // Initially using category as source, will be changed by users
  category: item.category, 
  date: item.date,
  content: item.content || "",
  imageUrl: item.imageUrl
}));

interface NewsItem {
  id: number;
  title: string;
  source: string;
  category: string;
  date: string;
  content?: string;
  imageUrl?: string;
}

export function NewsManagement() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  // Load news from localStorage or default
  useEffect(() => {
    const storedNews = localStorage.getItem("adminNewsData");
    if (storedNews) {
      try {
        setNewsItems(JSON.parse(storedNews));
      } catch (error) {
        console.error("Error parsing stored news:", error);
        setNewsItems(sampleNews);
      }
    } else {
      setNewsItems(sampleNews);
    }
  }, []);
  
  const handleAddNews = (news: Omit<NewsItem, "id">) => {
    const newItem = {
      ...news,
      id: newsItems.length ? Math.max(...newsItems.map(n => n.id)) + 1 : 1
    };
    
    const updatedNews = [...newsItems, newItem];
    setNewsItems(updatedNews);
    
    // Store in localStorage
    localStorage.setItem("adminNewsData", JSON.stringify(updatedNews));
    
    // Trigger storage event for other tabs to detect the change
    window.dispatchEvent(new Event('storage'));
    
    // Trigger custom event for same-tab updates
    const newsUpdatedEvent = new CustomEvent('newsUpdated');
    window.dispatchEvent(newsUpdatedEvent);
    
    toast({
      title: "News Added",
      description: `"${news.title}" has been added successfully.`,
    });
  };
  
  const handleEditNews = (news: NewsItem) => {
    const updatedNews = newsItems.map(item => item.id === news.id ? news : item);
    setNewsItems(updatedNews);
    
    // Update localStorage
    localStorage.setItem("adminNewsData", JSON.stringify(updatedNews));
    
    // Trigger storage event for other tabs to detect the change
    window.dispatchEvent(new Event('storage'));
    
    // Trigger custom event for same-tab updates
    const newsUpdatedEvent = new CustomEvent('newsUpdated');
    window.dispatchEvent(newsUpdatedEvent);
    
    toast({
      title: "News Updated",
      description: `"${news.title}" has been updated successfully.`,
    });
    setIsEditing(false);
    setCurrentNews(null);
  };
  
  const handleDeleteNews = (id: number) => {
    const updatedNews = newsItems.filter(item => item.id !== id);
    setNewsItems(updatedNews);
    
    // Update localStorage
    localStorage.setItem("adminNewsData", JSON.stringify(updatedNews));
    
    // Trigger storage event for other tabs to detect the change
    window.dispatchEvent(new Event('storage'));
    
    // Trigger custom event for same-tab updates
    const newsUpdatedEvent = new CustomEvent('newsUpdated');
    window.dispatchEvent(newsUpdatedEvent);
    
    toast({
      title: "News Deleted",
      description: "The news item has been deleted successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">News Articles</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add News
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <NewsForm 
              onSubmit={handleAddNews}
              isEditing={false}
              initialData={{
                title: "",
                source: "",
                category: "",
                date: new Date().toISOString().split('T')[0],
                content: "",
                imageUrl: ""
              }}
              availableCategories={availableCategories}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <Table>
        <TableCaption>List of all news articles</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {newsItems.map((news) => (
            <TableRow key={news.id}>
              <TableCell>{news.id}</TableCell>
              <TableCell className="font-medium">{news.title}</TableCell>
              <TableCell>{news.source}</TableCell>
              <TableCell>{news.category}</TableCell>
              <TableCell>{news.date}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => {
                          setCurrentNews(news);
                          setIsEditing(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      {isEditing && currentNews && (
                        <NewsForm 
                          onSubmit={handleEditNews}
                          isEditing={true}
                          initialData={currentNews}
                          availableCategories={availableCategories}
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
                        <DialogTitle>Delete News Article</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this news article? This action cannot be undone.
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
                          onClick={() => handleDeleteNews(news.id)}
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

interface NewsFormProps {
  onSubmit: (news: any) => void;
  isEditing: boolean;
  initialData: Omit<NewsItem, "id"> & Partial<Pick<NewsItem, "id">>;
  availableCategories: string[];
}

function NewsForm({ onSubmit, isEditing, initialData, availableCategories }: NewsFormProps) {
  const [formData, setFormData] = useState(initialData);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.imageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // Update form data with the data URL for storage
        setFormData({ ...formData, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Submit with the current form data (which includes the image data URL)
    onSubmit(formData);
  };
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit News Article" : "Add News Article"}</DialogTitle>
        <DialogDescription>
          {isEditing 
            ? "Update the details of this news article." 
            : "Fill in the details to add a new news article."}
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
            <Label htmlFor="source">Source (News Company Name)</Label>
            <Input
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              placeholder="e.g. JioNews, CNN, BBC"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              name="category"
              value={formData.category}
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
        
        <div className="space-y-2">
          <Label htmlFor="imageInput">Image</Label>
          <div className="flex items-center gap-2">
            <Button 
              type="button" 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
              Select Image
            </Button>
            <Input
              ref={fileInputRef}
              id="imageInput"
              name="imageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
            <span className="text-sm text-gray-500">
              {selectedImage?.name || (imagePreview && !selectedImage ? "Current image" : "No image selected")}
            </span>
          </div>
          
          {imagePreview && (
            <div className="mt-2">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-40 rounded-md object-cover"
              />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            rows={8}
            value={formData.content || ""}
            onChange={handleChange}
            placeholder="Write the news article content here..."
            required
          />
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">
            {isEditing ? "Update News" : "Add News"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
