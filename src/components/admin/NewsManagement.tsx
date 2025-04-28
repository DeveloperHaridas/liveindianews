
import { useState } from "react";
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
import { PlusCircle, Edit, Trash2 } from "lucide-react";

// Sample news data
const sampleNews = [
  { 
    id: 1, 
    title: "COVID-19 Cases Rising in Major Cities", 
    source: "Times Health",
    category: "Health", 
    date: "2025-04-27"
  },
  { 
    id: 2, 
    title: "New Economic Policy Announced", 
    source: "Business Standard",
    category: "Business", 
    date: "2025-04-26"
  },
  { 
    id: 3, 
    title: "National Cricket Team Wins Tournament", 
    source: "Sports Today",
    category: "Sports", 
    date: "2025-04-25"
  },
];

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
  const [newsItems, setNewsItems] = useState<NewsItem[]>(sampleNews);
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  const handleAddNews = (news: Omit<NewsItem, "id">) => {
    const newItem = {
      ...news,
      id: newsItems.length ? Math.max(...newsItems.map(n => n.id)) + 1 : 1
    };
    
    setNewsItems([...newsItems, newItem]);
    toast({
      title: "News Added",
      description: `"${news.title}" has been added successfully.`,
    });
  };
  
  const handleEditNews = (news: NewsItem) => {
    setNewsItems(newsItems.map(item => item.id === news.id ? news : item));
    toast({
      title: "News Updated",
      description: `"${news.title}" has been updated successfully.`,
    });
    setIsEditing(false);
    setCurrentNews(null);
  };
  
  const handleDeleteNews = (id: number) => {
    setNewsItems(newsItems.filter(item => item.id !== id));
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
}

function NewsForm({ onSubmit, isEditing, initialData }: NewsFormProps) {
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
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
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
        
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={formData.imageUrl || ""}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
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
