import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getSupabaseData, setSupabaseData } from "@/lib/supabaseHelpers";
import { motion } from "framer-motion";
import { Upload, Calendar, Download, Trash2, Plus } from "lucide-react";

interface HolidayItem {
  id: string;
  title: string;
  description: string;
  date: string;
  fileUrl: string;
  fileName: string;
  uploadedAt: string;
}

const HolidayManager = () => {
  const [holidayData, setHolidayData] = useState<HolidayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    file: null as File | null
  });

  // Load existing holiday data
  useEffect(() => {
    const loadHolidayData = async () => {
      try {
        setLoading(true);
        const data = await getSupabaseData<HolidayItem[]>('royal-academy-holidays', []);
        setHolidayData(data || []);
      } catch (error) {
        console.error("Error loading holiday data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHolidayData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.date) {
      alert("Please select a date for the holiday");
      return;
    }

    setUploading(true);
    setSuccess(false);
    
    try {
      // In a real implementation, you would upload the file to storage
      // For now, we'll create a mock file URL
      const mockFileUrl = formData.file ? URL.createObjectURL(formData.file) : "";
      
      const newHolidayItem: HolidayItem = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        description: formData.description,
        date: formData.date,
        fileUrl: mockFileUrl,
        fileName: formData.file?.name || "",
        uploadedAt: new Date().toISOString()
      };

      // Save to Supabase
      const updatedData = [...holidayData, newHolidayItem];
      await setSupabaseData('royal-academy-holidays', updatedData);
      
      // Update state
      setHolidayData(updatedData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        date: "",
        file: null
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving holiday:", error);
      alert("Failed to save holiday. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this holiday?")) {
      return;
    }
    
    try {
      const updatedData = holidayData.filter(item => item.id !== id);
      await setSupabaseData('royal-academy-holidays', updatedData);
      setHolidayData(updatedData);
    } catch (error) {
      console.error("Error deleting holiday:", error);
      alert("Failed to delete holiday. Please try again.");
    }
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    if (!fileUrl) {
      alert("No file available for download");
      return;
    }
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Holiday Manager</h2>
        <p className="text-muted-foreground">
          Upload and manage holiday notices and documents
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Upload Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Add New Holiday
              </CardTitle>
              <CardDescription>
                Upload holiday notices and related documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Holiday Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Winter Break"
                    required
                    className="text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the holiday..."
                    rows={3}
                    required
                    className="text-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Upload Document (Optional)</Label>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <div className="flex flex-col items-start gap-2">
                    <Button 
                      type="button" 
                      onClick={triggerFileInput}
                      className="bg-gradient-to-r from-gold to-yellow-500 text-white font-bold hover:from-gold/90 hover:to-yellow-500/90 text-sm sm:text-base w-full sm:w-auto"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                    <span className="text-xs sm:text-sm text-muted-foreground break-all">
                      {formData.file ? formData.file.name : "No file chosen"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: PDF, DOC, DOCX. Maximum file size: 10MB
                  </p>
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    disabled={uploading}
                    className="w-full bg-gradient-to-r from-gold to-yellow-500 text-white font-bold hover:from-gold/90 hover:to-yellow-500/90"
                  >
                    {uploading ? "Saving..." : "Save Holiday"}
                  </Button>
                  
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-600 text-center"
                    >
                      Holiday saved successfully!
                    </motion.div>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Holiday List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Holidays
              </CardTitle>
              <CardDescription>
                Manage existing holiday notices
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                </div>
              ) : holidayData.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No holidays added yet</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {holidayData.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/10 transition-colors gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-medium text-foreground truncate text-sm sm:text-base">
                            {item.title}
                          </h3>
                          <span className="text-xs bg-gold/10 text-gold px-2 py-1 rounded-full whitespace-nowrap">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-2">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-1">
                          <span>Added: {new Date(item.uploadedAt).toLocaleDateString()}</span>
                          {item.fileName && (
                            <>
                              <span>•</span>
                              <span className="truncate">{item.fileName}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {item.fileName && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(item.fileUrl, item.fileName)}
                            className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="h-8 w-8 p-0 sm:h-9 sm:w-9"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default HolidayManager;