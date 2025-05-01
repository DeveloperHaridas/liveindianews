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
import { PlusCircle, Edit, Trash2, Upload, Filter } from "lucide-react";
import news from "@/data/newsData";

// Updated to include Latest and Web Stories categories
const baseCategories = [
  "Latest",
  "Web Stories",
  "India", 
  "World", 
  "Education", 
  "Health", 
  "Lifestyle", 
  "City", 
  "Business", 
  "Sports", 
  "Entertainment", 
  "Technology", 
  "Science"
];

// Extract all unique categories from the news data and combine with base categories
const availableCategories = Array.from(
  new Set([
    ...baseCategories,
    ...news.map(item => item.category)
  ])
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

// Add some sample Web Stories and Latest news
const additionalSampleNews = [
  {
    id: 101,
    title: "Latest Breaking News: Economic Summit",
    source: "JioNews",
    category: "Latest",
    date: new Date().toISOString().split('T')[0],
    content: "This is the latest breaking news about the economic summit being held in the capital.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3"
  },
  {
    id: 102,
    title: "Web Story: The Rise of AI in Daily Life",
    source: "JioNews",
    category: "Web Stories",
    date: new Date().toISOString().split('T')[0],
    content: "This web story explores how artificial intelligence is transforming our daily lives.",
    imageUrl: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-4.0.3"
  },
  {
    id: 103,
    title: "Latest Update: New Government Policies",
    source: "JioNews",
    category: "Latest",
    date: new Date().toISOString().split('T')[0],
    content: "Latest updates on the new policies announced by the government yesterday.",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-4.0.3"
  },
  {
    id: 104,
    title: "Web Story: Celebrating Local Heroes",
    source: "JioNews",
    category: "Web Stories",
    date: new Date().toISOString().split('T')[0],
    content: "A visual journey showcasing the impact of local heroes in our communities.",
    imageUrl: "https://images.unsplash.com/photo-1469571486292-b53601021a68?ixlib=rb-4.0.3"
  }
];

// Combine with sample news
const enhancedSampleNews = [...sampleNews, ...additionalSampleNews];

interface NewsItem {
  id: number;
  title: string;
  source: string;
  category: string;
  date: string;
  content?: string;
  imageUrl?: string;
}

interface FilterOptions {
  title: string;
  source: string;
  category: string;
  date: string;
}

export function NewsManagement() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    title: "",
    source: "",
    category: "",
    date: "",
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { toast } = useToast();
  
  // Load news from localStorage or default
  useEffect(() => {
    const storedNews = localStorage.getItem("adminNewsData");
    if (storedNews) {
      try {
        const parsedNews = JSON.parse(storedNews);
        setNewsItems(parsedNews);
        setFilteredNews(parsedNews);
      } catch (error) {
        console.error("Error parsing stored news:", error);
        setNewsItems(enhancedSampleNews);
        setFilteredNews(enhancedSampleNews);
      }
    } else {
      setNewsItems(enhancedSampleNews);
      setFilteredNews(enhancedSampleNews);
    }
  }, []);

  // Filter news items based on filter options
  useEffect(() => {
    let result = [...newsItems];
    
    if (filterOptions.title) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(filterOptions.title.toLowerCase())
      );
    }
    
    if (filterOptions.source) {
      result = result.filter(item => 
        item.source.toLowerCase().includes(filterOptions.source.toLowerCase())
      );
    }
    
    if (filterOptions.category) {
      result = result.filter(item => 
        filterOptions.category === "all" || item.category === filterOptions.category
      );
    }
    
    if (filterOptions.date) {
      result = result.filter(item => item.date === filterOptions.date);
    }
    
    setFilteredNews(result);
  }, [filterOptions, newsItems]);
  
  // Handle filter changes
  const handleFilterChange = (name: string, value: string) => {
    setFilterOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilterOptions({
      title: "",
      source: "",
      category: "",
      date: "",
    });
  };
  
  // Get unique sources for filter dropdown
  const uniqueSources = Array.from(new Set(newsItems.map(item => item.source))).sort();
  
  // Get unique dates for filter dropdown
  const uniqueDates = Array.from(new Set(newsItems.map(item => item.date))).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );
  
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
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          
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
      </div>
      
      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="bg-gray-50 p-4 rounded-md mb-4 shadow-sm border">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="titleFilter">Title</Label>
              <Input
                id="titleFilter"
                placeholder="Filter by title"
                value={filterOptions.title}
                onChange={(e) => handleFilterChange('title', e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="sourceFilter">Source</Label>
              <Select
                value={filterOptions.source}
                onValueChange={(value) => handleFilterChange('source', value)}
              >
                <SelectTrigger id="sourceFilter" className="mt-1">
                  <SelectValue placeholder="All sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-sources">All sources</SelectItem>
                  {uniqueSources.map((source) => (
                    <SelectItem key={source} value={source}>{source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="categoryFilter">Category</Label>
              <Select
                value={filterOptions.category}
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger id="categoryFilter" className="mt-1">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All categories</SelectItem>
                  {availableCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="dateFilter">Date</Label>
              <Select
                value={filterOptions.date}
                onValueChange={(value) => handleFilterChange('date', value)}
              >
                <SelectTrigger id="dateFilter" className="mt-1">
                  <SelectValue placeholder="All dates" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-dates">All dates</SelectItem>
                  {uniqueDates.map((date) => (
                    <SelectItem key={date} value={date}>{date}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      )}
      
      <Table>
        <TableCaption>
          {filteredNews.length === newsItems.length 
            ? `List of all news articles (${filteredNews.length})`
            : `Filtered news articles (${filteredNews.length} of ${newsItems.length})`
          }
        </TableCaption>
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
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => (
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No news articles found matching your filters.
              </TableCell>
            </TableRow>
          )}
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
